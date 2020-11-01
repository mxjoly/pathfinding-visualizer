import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Menu from '../../molecules/Menu';
import RadioButtonGroup from '../../organisms/RadioButtonGroup';
import ToggleButton from '../../atoms/ToggleButton';
import { IconContext } from 'react-icons';
import { MdPlayArrow, MdRefresh, MdBugReport } from 'react-icons/md';
import './styles.scss';

function ControlBar(props) {
  function onChangeValue(event) {
    if (event.target.value.match(/(departure|destination|barrier)/)) {
      props.onSelectionModeChange(event.target.value);
    } else {
      console.warn('Selection mode unknown');
    }
  }

  return (
    <div className="NavigationBar">
      <h1>Pathfinding visualizer</h1>
      <div>
        <RadioButtonGroup
          onChange={onChangeValue}
          names="selectionMode"
          values={['departure', 'destination', 'barrier']}
          defaultValue="departure"
        />
        <IconContext.Provider value={{ className: 'Icons' }}>
          <Button onClick={props.onStart} useIcon>
            <MdPlayArrow />
          </Button>
          <Button onClick={props.onReset} useIcon>
            <MdRefresh />
          </Button>
          <ToggleButton
            selected={props.displayNodeWeight}
            toggleSelected={props.onDisplayNodeWeight}
          >
            <MdBugReport
              color={props.displayNodeWeight ? 'firebrick' : '#000000'}
            />
          </ToggleButton>
        </IconContext.Provider>
        <Menu
          items={props.algorithms}
          defaultItem={props.algorithms[0]}
          placeholder={'Algorithm'}
          onSelect={(e) => props.onAlgorithmChange(e)}
        />
      </div>
    </div>
  );
}

ControlBar.propTypes = {
  algorithms: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayNodeWeight: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onAlgorithmChange: PropTypes.func.isRequired,
  onSelectionModeChange: PropTypes.func.isRequired,
  onDisplayNodeWeight: PropTypes.func,
};

export default ControlBar;
