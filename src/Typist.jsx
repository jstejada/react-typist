import React, {Component, PropTypes} from 'react';
import Cursor from './Cursor';
import * as utils from './utils';


export default class Typist extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    avgTypingDelay: PropTypes.number,
    startDelay: PropTypes.number,
    cursor: PropTypes.object,
    onTypingDone: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    avgTypingDelay: 70,
    startDelay: 0,
    cursor: {},
    onTypingDone: () => {},
  }

  constructor(props) {
    super(props);
    this.toType = utils.extractText(this.props.children);
    this.elFactories = utils.extractElementFactories(this.props.children);
    this.state = {
      text: [],
    };

    if (this.props.startDelay > 0) {
      this.typeAll = setTimeout.bind(window, this.typeAll.bind(this), this.props.startDelay);
    }
  }

  componentDidMount() {
    if (this.props.children) {
      this.typeAll();
    }
  }

  typeAll(strs = this.toType) {
    utils.asyncEach(strs, (line, adv, idx)=> {
      this.setState({text: this.state.text.concat([''])}, ()=> {
        this.typeStr(line, idx, adv);
      });
    }, this.props.onTypingDone);
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
      utils.gaussianRnd.bind(null, {mean: this.props.avgTypingDelay})
    );
  }

  render() {
    const className = this.props.className;
    const els = this.state.text.map((line, idx)=>{
      return this.elFactories[idx](line);
    });

    return (
      <div className={`Typist ${className}`}>
        {els}
        <Cursor {...this.props.cursor} />
      </div>
    );
  }

}
