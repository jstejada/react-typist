import React, {Component, PropTypes} from 'react';
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
  }

  static defaultProps = {
    className: '',
    avgTypingDelay: 70,
    stdTypingDelay: 25,
    startDelay: 0,
    cursor: {},
    onTypingDone: () => {},
    delayGenerator: utils.gaussianRnd,
  }

  constructor(props) {
    super(props);
    if (this.props.children) {
      this.toType = utils.extractText(this.props.children);

      if (this.props.startDelay > 0) {
        this.typeAll = setTimeout.bind(window, this.typeAll.bind(this), this.props.startDelay);
      }
    }
  }

  state = {
    text: [],
    isDone: false,
  }

  componentDidMount() {
    if (this.props.children) {
      this.typeAll();
    } else {
      this.onTypingDone();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let idx = 0; idx < nextState.text.length; idx++) {
      const txt = this.state.text[idx];
      const ntxt = nextState.text[idx];
      if (txt !== ntxt && ntxt.length > 0) return true;
    }
    return this.state.isDone !== nextState.isDone;
  }

  onTypingDone = ()=> {
    this.setState({isDone: true});
    this.props.onTypingDone();
  }

  delayGenerator = (line, lineIdx, character, charIdx)=> {
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
        defDelayGenerator: (mn = mean, st = std)=> utils.gaussianRnd(mn, st),
      }
    );
  }

  typeAll(strs = this.toType) {
    utils.asyncEach(strs, (line, adv, idx)=> {
      this.setState({text: this.state.text.concat([''])}, ()=> {
        this.typeStr(line, idx, adv);
      });
    }, this.onTypingDone);
  }

  typeStr(line, idx, onDone = ()=>{}) {
    utils.eachRndTimeout(
      line,
      (ch, adv)=> {
        const text = this.state.text.slice();
        text[idx] += ch;
        this.setState({text}, adv);
      },
      onDone,
      this.delayGenerator.bind(this, line, idx)
    );
  }

  render() {
    const className = this.props.className;
    const innerTree = utils.extractTreeWithText(this.props.children, this.state.text);

    return (
      <div className={`Typist ${className}`}>
        {innerTree}
        <Cursor isDone={this.state.isDone} {...this.props.cursor} />
      </div>
    );
  }

}
