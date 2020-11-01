import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ToggleButton(props) {
  return (
    <button
      className={`ToggleButton ${
        props.selected ? 'ToggleButton_disabled' : ''
      }`}
      onClick={props.toggleSelected}
    >
      {props.children}
    </button>
  );
}

ToggleButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default ToggleButton;
