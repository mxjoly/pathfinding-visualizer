import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Button(props) {
  return (
    <button
      className="Button"
      style={
        props.useIcon
          ? { ...props.style, backgroundColor: 'transparent', border: 'none' }
          : props.style
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  useIcon: PropTypes.bool,
};

export default Button;
