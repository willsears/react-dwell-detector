import React from 'react';
import PropTypes from 'prop-types';
import ModifiedChild from './ModifiedChild';

const NO_OP = () => {};

const DwellDetector = ({ dwellingTime, onDwell, children }) =>
  React.Children.map(children, child => (
    <ModifiedChild
      child={child}
      dwellingTime={dwellingTime}
      onDwell={onDwell}
    />
  ));

DwellDetector.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dwellingTime: PropTypes.number,
  onDwell: PropTypes.func,
};

DwellDetector.defaultProps = {
  children: [],
  dwellingTime: 333,
  onDwell: NO_OP,
};

export default DwellDetector;
