import React, {Component, PropTypes} from 'react';
import './Cursor.scss';


export default class Cursor extends Component {

  static propTypes = {
    blink: PropTypes.bool,
    show: PropTypes.bool,
    element: PropTypes.node,
  }

  static defaultProps = {
    blink: true,
    show: true,
    element: '|',
  }

  constructor(props) {
    super(props);
  }

  render() {
    let el = null;
    if (this.props.show) {
      const blink = this.props.blink ? '--blinking' : '';
      el = (
        <span className={`Cursor${blink}`}>
          {this.props.element}
        </span>
      );
    }
    return el;
  }

}
