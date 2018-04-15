import React from 'react';
import PropTypes from 'prop-types';

const Backspace = () => <noscript />;

Backspace.componentName = 'Backspace';

Backspace.propTypes = {
  count: PropTypes.number,
  delay: PropTypes.number,
};

Backspace.defaultProps = {
  count: 1,
  delay: 0,
};

export default Backspace;
