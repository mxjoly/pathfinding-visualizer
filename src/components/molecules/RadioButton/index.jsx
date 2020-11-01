import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function RadioButton(props) {
  return (
    <div className="RadioButton">
      <input
        className="RadioButton__Input"
        type="radio"
        name={props.name}
        value={props.value}
        defaultChecked={props.defaultChecked}
      />
      {props.label && (
        <label className="RadioButton__Label" htmlFor={props.name}>
          {props.label}
        </label>
      )}
    </div>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
};

export default RadioButton;
