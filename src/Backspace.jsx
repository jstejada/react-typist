import React from 'react';
import PropTypes from 'prop-types';

const Backspace = () => <noscript />;

Backspace.propTypes = {
  count: PropTypes.number,
  line: PropTypes.bool,
  delay: PropTypes.number,
};

Backspace.defaultProps = {
  count: 1,
  line: false,
  delay: 0,
};

export default Backspace;
