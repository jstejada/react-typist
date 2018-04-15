import React from 'react';
import PropTypes from 'prop-types';

const Delay = () => <noscript />;

Delay.componentName = 'Delay';

Delay.propTypes = {
  ms: PropTypes.number.isRequired,
};

export default Delay;
