import React, {Component, PropTypes} from 'react';


export default class Typist extends Component {

  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
  }

  render() {
    const className = this.props.className;

    return (
      <div className={`Typist ${className}`}>
        Hello World
      </div>
    );
  }

}
