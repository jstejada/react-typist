import React, {Component, PropTypes} from 'react';
import * as utils from './utils';


export default class Typist extends Component {

  static propTypes = {
    className: PropTypes.string,
    onTypingDone: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    onTypingDone: () => {},
  }

  constructor(props) {
    super(props);
    this.toType = utils.extractText(this.props.children);
    this.elFactories = utils.extractElementFactories(this.props.children);
    this.state = {
      text: Array.apply(null, Array(this.toType.length)).map(()=> ''),
    };
  }

  componentDidMount() {
    if (this.props.children) {
      this.typeText(this.toType);
    }
  }

  typeText(toType) {
    utils.asyncEach(toType, (line, adv, idx)=> {
      this.typeLine(line, idx, adv);
    }, this.props.onTypingDone);
  }

  typeLine(line, idx, onDone = ()=>{}) {
    utils.eachRndTimeout(
      line,
      (ch, adv)=> {
        const text = this.state.text.slice();
        text[idx] += ch;
        this.setState({text}, adv);
      },
      onDone
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
