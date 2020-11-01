import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../../molecules/RadioButton';
import './styles.scss';

function RadioButtonGroup(props) {
  return (
    <div className="RadioButtonGroup" onChange={props.onChange}>
      {props.values.map((value) => (
        <RadioButton
          key={value}
          name={props.names}
          value={value}
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          defaultChecked={value === props.defaultValue}
        />
      ))}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  names: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
};

export default RadioButtonGroup;
