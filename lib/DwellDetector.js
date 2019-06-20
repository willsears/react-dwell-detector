"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ModifiedChild = _interopRequireDefault(require("./ModifiedChild"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NO_OP = function NO_OP() {};

var DwellDetector = function DwellDetector(_ref) {
  var dwellingTime = _ref.dwellingTime,
      onDwell = _ref.onDwell,
      children = _ref.children;
  return _react.default.Children.map(children, function (child) {
    return _react.default.createElement(_ModifiedChild.default, {
      child: child,
      dwellingTime: dwellingTime,
      onDwell: onDwell
    });
  });
};

DwellDetector.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  dwellingTime: _propTypes.default.number,
  onDwell: _propTypes.default.func
};
DwellDetector.defaultProps = {
  children: [],
  dwellingTime: 333,
  onDwell: NO_OP
};
var _default = DwellDetector;
exports.default = _default;