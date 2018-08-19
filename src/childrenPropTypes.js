import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);
