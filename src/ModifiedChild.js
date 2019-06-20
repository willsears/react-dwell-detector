import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const NO_OP = () => {};

const ModifiedChild = ({ child, dwellingTime, onDwell }) => {
  const timeoutId = useRef();
  const onMouseOverChild = child.props.onMouseOver || NO_OP;
  const onMouseOutChild = child.props.onMouseOut || NO_OP;

  const onMouseOverWrapper = useCallback(
    e => {
      timeoutId.current = setTimeout(
        () => onDwell(e, child.props),
        dwellingTime
      );
      onMouseOverChild(e);
    },
    [child, dwellingTime, onDwell, timeoutId]
  );

  const onMouseOutWrapper = useCallback(
    e => {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      onMouseOutChild(e);
    },
    [child, timeoutId]
  );

  return React.cloneElement(child, {
    onMouseOver: onMouseOverWrapper,
    onMouseOut: onMouseOutWrapper,
  });
};

ModifiedChild.PropTypes = {
  child: PropTypes.node.isRequired,
  dwellingTime: PropTypes.number.isRequired,
  onDwell: PropTypes.func.isRequired,
};

export default React.memo(ModifiedChild);
