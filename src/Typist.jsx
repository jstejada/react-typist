import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cursor from './Cursor';
import Backspace from './Backspace';
import Delay from './Delay';
import * as utils from './utils';


const ACTION_CHARS = ['🔙', '⏰'];

export default class Typist extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    avgTypingDelay: PropTypes.number,
    stdTypingDelay: PropTypes.number,
    startDelay: PropTypes.number,
    cursor: PropTypes.object,
    onCharacterTyped: PropTypes.func,
    onLineTyped: PropTypes.func,
    onTypingDone: PropTypes.func,
    delayGenerator: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    avgTypingDelay: 70,
    stdTypingDelay: 25,
    startDelay: 0,
    cursor: {},
    onCharacterTyped: () => {},
    onLineTyped: () => {},
    onTypingDone: () => {},
    delayGenerator: utils.gaussianRnd,
  }

  constructor(props) {
    super(props);
    this.mounted = false;
    this.linesToType = [];
    this.delay = null;

    if (props.children) {
      this.linesToType = utils.extractTextFromElement(props.children);
    }
  }

  state = {
    textLines: [],
    isDone: false,
  }

  componentDidMount() {
    this.mounted = true;
    const { children, startDelay } = this.props;
    if (children) {
      if (startDelay > 0 && typeof window !== 'undefined') {
        setTimeout(this.typeAllLines.bind(this), startDelay);
      } else {
        this.typeAllLines();
      }
    } else {
      this.onTypingDone();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.textLines.length !== this.state.textLines.length) {
      return true;
    }
    for (let idx = 0; idx < nextState.textLines.length; idx++) {
      const line = this.state.textLines[idx];
      const nextLine = nextState.textLines[idx];
      if (line !== nextLine) {
        return true;
      }
    }
    return this.state.isDone !== nextState.isDone;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onTypingDone = () => {
    if (!this.mounted) { return; }
    this.setState({ isDone: true });
    this.props.onTypingDone();
  }

  delayGenerator = (line, lineIdx, character, charIdx) => {
    const mean = this.props.avgTypingDelay;
    const std = this.props.stdTypingDelay;

    return this.props.delayGenerator(
      mean,
      std,
      {
        line,
        lineIdx,
        character,
        charIdx,
        defDelayGenerator: (mn = mean, st = std) => utils.gaussianRnd(mn, st),
      }
    );
  }

  typeAllLines(lines = this.linesToType) {
    return utils.eachPromise(lines, this.typeLine)
    .then(() => this.onTypingDone());
  }

  typeLine = (line, lineIdx) => {
    if (!this.mounted) { return Promise.resolve(); }

    // If `line` is not a string, it is either a `Backspace` or a `Delay` element.
    // See `extractTextFromElement`
    const isBackspaceOrDelayElement = typeof line !== 'string';

    let decoratedLine = line;
    const { onLineTyped } = this.props;

    if (isBackspaceOrDelayElement) {
      if (line.type && line.type.name === 'Backspace') {
        if (line.props.delay > 0) {
          this.delay = line.props.delay;
        }
        decoratedLine = String('🔙').repeat(line.props.count);
      } else if (line.type && line.type.name === 'Delay') {
        this.delay = line.props.ms;
        decoratedLine = '⏰';
      }
    }

    return new Promise((resolve, reject) => {
      this.setState({ textLines: this.state.textLines.concat(['']) }, () => {
        utils.eachPromise(decoratedLine, this.typeCharacter, decoratedLine, lineIdx)
        .then(() => onLineTyped(decoratedLine, lineIdx))
        .then(resolve)
        .catch(reject);
      });
    });
  }

  typeCharacter = (character, charIdx, line, lineIdx) => {
    if (!this.mounted) { return Promise.resolve(); }
    const { onCharacterTyped } = this.props;

    return new Promise((resolve) => {
      const textLines = this.state.textLines.slice();

      const isBackspace = character === '🔙';
      const isDelay = character === '⏰';
      if (isDelay) {
        resolve();
        return;
      }

      if (isBackspace && lineIdx > 0) {
        let prevLineIdx = lineIdx - 1;
        let prevLine = textLines[prevLineIdx];

        for (let idx = prevLineIdx; idx >= 0; idx --) {
          if (prevLine.length > 0 && !ACTION_CHARS.includes(prevLine[0])) {
            break;
          }
          prevLineIdx = idx;
          prevLine = textLines[prevLineIdx];
        }

        textLines[prevLineIdx] = prevLine.substr(0, prevLine.length - 1);
      } else {
        textLines[lineIdx] += character;
      }

      const delay = this.delay || this.delayGenerator(line, lineIdx, character, charIdx);
      setTimeout(() => this.setState({ textLines }, () => {
        this.delay = null;
        onCharacterTyped(character, charIdx);
        resolve();
      }), delay);
    });
  }

  render() {
    const { className, cursor } = this.props;
    const { isDone } = this.state;
    const innerTree = utils.cloneElementWithSpecifiedText({
      element: this.props.children,
      textLines: this.state.textLines,
    });

    return (
      <div className={`Typist ${className}`}>
        {innerTree}
        <Cursor isDone={isDone} {...cursor} />
      </div>
    );
  }

}

Typist.Backspace = Backspace;
Typist.Delay = Delay;
