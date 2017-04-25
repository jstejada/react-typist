import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this._isReRenderingCursor = false;
    this.state = {
      shouldRender: this.props.show,
    };
  }

  componentWillReceiveProps(nextProps) {
    const shouldHide = !this.props.isDone && nextProps.isDone && this.props.hideWhenDone;
    if (shouldHide) {
      setTimeout(() => this.setState({ shouldRender: false }), this.props.hideWhenDoneDelay);
    }
  }

  componentDidUpdate() {
    const { show, isDone } = this.props;
    if (!show) { return; }
    if (isDone) { return; }
    if (this._isReRenderingCursor) { return; }

    // In webkit and blink, rendering the cursor alongside the text as it
    // animates sometimes causes the text to stop rendering when it reaches
    // a new line break, even though the underlying DOM /does/ contain
    // the text. This seems to happen when the space available for the text is
    // at a specific width that makes it so the line break happens within a
    // word.
    // Using dev tools, when in this state, if you modify the dom or any style,
    // it immediately renders all of the text in its correct position.
    // Given that observation, this is a hackish solutions that re-renders the
    // cursor every time a character is rendered, just to ensure that the text
    // is rendered correctly.
    // See #13 and #15 for more details
    this._reRenderCursor();
  }

  _reRenderCursor() {
    this._isReRenderingCursor = true;
    this.setState({ shouldRender: false }, () => {
      this.setState({ shouldRender: true }, () => {
        this._isReRenderingCursor = false;
      });
    });
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
