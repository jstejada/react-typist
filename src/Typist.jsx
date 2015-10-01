import React, {Component, PropTypes} from 'react';
import {asyncEach, eachRndTimeout} from './utils';


export default class Typist extends Component {

  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.toType = this.props.children;
    const count = React.Children.count(this.toType);
    this.state = {
      text: Array.apply(null, Array(count)).map(()=> ''),
    };
  }

  componentDidMount() {
    if (this.props.children) {
      this.typeText(this.toType);
    }
  }

  typeText(toType) {
    if (Array.isArray(toType)) {
      asyncEach(toType, (line, adv, idx)=> {
        this.typeLine(line, idx, adv);
      });
    } else {
      this.typeLine(toType, 0);
    }
  }

  typeLine(line, idx, onDone = ()=>{}) {
    eachRndTimeout(
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

    return (
      <div className={`Typist ${className}`}>
        {this.state.text.map((line, idx)=>
          <p key={`l-${idx}`}>{line}</p>
        )}
      </div>
    );
  }

}
