import React, { Component, PropTypes } from 'react';
import Cursor from './Cursor';
import * as utils from './utils';


export default class Typist extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    avgTypingDelay: PropTypes.number,
    stdTypingDelay: PropTypes.number,
    startDelay: PropTypes.number,
    cursor: PropTypes.object,
    onTypingDone: PropTypes.func,
    delayGenerator: PropTypes.func,
    direction: PropTypes.number,
  }

  static defaultProps = {
    className: '',
    avgTypingDelay: 70,
    stdTypingDelay: 25,
    startDelay: 0,
    cursor: {},
    onTypingDone: () => {},
    delayGenerator: utils.gaussianRnd,
    direction: 1,
  }

  constructor(props) {
    super(props);
    this.mounted = false;
    this.linesToType = [];

    if (props.children) {
      this.linesToType = utils.extractText(props.children);
    }
  }

  state = {
    text: [],
    isDone: false,
    flag: true,
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
    if (this.props.direction !== nextProps.direction && nextState.isDone) {
      return true;
    }
    for (let idx = 0; idx < nextState.text.length; idx++) {
      const txt = this.state.text[idx];
      const ntxt = nextState.text[idx];
      if (txt !== ntxt && ntxt.length > 0) return true;
    }
    return this.state.isDone !== nextState.isDone;
  }
  componentDidUpdate(prevProps) {
    if (this.props.direction !== prevProps.direction && this.state.isDone) {
      if (this.props.direction === 1) {
        this.typeAllLines.bind(this);
      } else if (this.props.direction === -1) {
        this.removeAllLines.bind(this);
      }
    }
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
    this.setState({ isDone: false, text: [] });
    return utils.eachPromise(lines, (line, idx) => {
      if (!this.mounted) { return Promise.resolve(); }
      return new Promise((resolve) => {
        this.setState({ text: this.state.text.concat(['']) }, () => {
          this.typeLine(line, idx).then(resolve);
        });
      });
    })
    .then(() => this.onTypingDone());
  }

  typeLine(line, lineIdx) {
    return utils.eachPromise(line, (character, charIdx) => {
      if (!this.mounted) { return Promise.resolve(); }
      return new Promise((resolve) => {
        const text = this.state.text.slice();
        text[lineIdx] += character;
        this.setState({ text }, () => {
          const delay = this.delayGenerator(line, lineIdx, character, charIdx);
          setTimeout(resolve, delay);
        });
      });
    });
  }
  removeAllLines() {
    let lines = this.state.text;
    if (lines.length > 1) {
      lines = lines.slice(0, lines.length - 1);
      this.setState({ text: lines,
                            isDone: false,
                         });
    } else {
      this.setState({ isDone: false });
    }
    return utils.eachPromiseRemove(lines, (line, idx) => {
      if (!this.mounted) { return Promise.resolve(); }
      return new Promise((resolve) => {
        this.setState({ flag: !this.state.flag }, () => {
          this.removeLine(line, idx).then(() => {
            this.setState({ text: this.state.text.slice(0, this.state.text.length - 1) });
            resolve();
          });
        });
      });
    })
    .then(() => this.onTypingDone());
  }

  removeLine(line, lineIdx) {
    return utils.eachPromise(line, (character, charIdx) => {
      if (!this.mounted) { return Promise.resolve(); }
      return new Promise((resolve) => {
        const text = this.state.text.slice();
        if (text.length > lineIdx && text[lineIdx].length) {
          text[lineIdx] = text[lineIdx].slice(0, text[lineIdx].length - 1);
        }
        this.setState({ text }, () => {
          const delay = this.delayGenerator(line, lineIdx - 1, character, charIdx);
          setTimeout(resolve, delay);
        });
      });
    });
  }

  render() {
    const { className, cursor } = this.props;
    const { isDone } = this.state;
    const innerTree = utils.extractTreeWithText(this.props.children, this.state.text);

    return (
      <div className={`Typist ${className}`}>
        {innerTree}
        <Cursor isDone={isDone} {...cursor} />
      </div>
    );
  }

}
