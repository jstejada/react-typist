import React, {Component, PropTypes} from 'react';
import './Cursor.scss';


export default class Cursor extends Component {

  static propTypes = {
    blink: PropTypes.bool,
    show: PropTypes.bool,
    element: PropTypes.node,
    hideWhenDone: PropTypes.bool,
    hideWhenDoneDelay: PropTypes.number,
    isDone: PropTypes.bool,
  }

  static defaultProps = {
    blink: true,
    show: true,
    element: '|',
    hideWhenDone: false,
    hideWhenDoneDelay: 1000,
    isDone: false,
  }

  constructor(props) {
    super(props);
  }

  state = {
    shouldRender: this.props.show,
  }

  componentWillReceiveProps(nextProps) {
    const shouldHide = !this.props.isDone && nextProps.isDone && this.props.hideWhenDone;
    if (shouldHide) {
      setTimeout(()=> this.setState({shouldRender: false}), this.props.hideWhenDoneDelay);
    }
  }

  render() {
    if (this.state.shouldRender) {
      const className = this.props.blink ? ' Cursor--blinking' : '';
      return (
        <span className={`Cursor${className}`}>
          {this.props.element}
        </span>
      );
    }
    return null;
  }

}
