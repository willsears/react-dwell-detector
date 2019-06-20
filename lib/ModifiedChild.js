"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var NO_OP = function NO_OP() {};

var ModifiedChild = function ModifiedChild(_ref) {
  var child = _ref.child,
      dwellingTime = _ref.dwellingTime,
      onDwell = _ref.onDwell;
  var timeoutId = (0, _react.useRef)();
  var onMouseOverChild = child.props.onMouseOver || NO_OP;
  var onMouseOutChild = child.props.onMouseOut || NO_OP;
  var onMouseOverWrapper = (0, _react.useCallback)(function (e) {
    timeoutId.current = setTimeout(function () {
      return onDwell(e, child.props);
    }, dwellingTime);
    onMouseOverChild(e);
  }, [child, dwellingTime, onDwell, timeoutId]);
  var onMouseOutWrapper = (0, _react.useCallback)(function (e) {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
    onMouseOutChild(e);
  }, [child, timeoutId]);
  return _react.default.cloneElement(child, {
    onMouseOver: onMouseOverWrapper,
    onMouseOut: onMouseOutWrapper
  });
};

ModifiedChild.PropTypes = {
  child: _propTypes.default.node.isRequired,
  dwellingTime: _propTypes.default.number.isRequired,
  onDwell: _propTypes.default.func.isRequired
};

var _default = _react.default.memo(ModifiedChild);

exports.default = _default;