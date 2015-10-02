import React, {Component, PropTypes} from 'react';
import * as utils from './utils';


export default class Typist extends Component {

  static propTypes = {
    className: PropTypes.string,
    avgTypingDelay: PropTypes.number,
    onTypingDone: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    avgTypingDelay: 70,
    onTypingDone: () => {},
  }

  constructor(props) {
    super(props);
    this.toType = utils.extractText(this.props.children);
    this.elFactories = utils.extractElementFactories(this.props.children);
    this.state = {
      text: [],
    };
  }

  componentDidMount() {
    if (this.props.children) {
      this.typeEach(this.toType);
    }
  }

  typeEach(toType) {
    utils.asyncEach(toType, (line, adv, idx)=> {
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
      </div>
    );
  }

}
