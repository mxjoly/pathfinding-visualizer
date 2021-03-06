import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Menu from '../../molecules/Menu';
import RadioButtonGroup from '../../molecules/RadioButtonGroup';
import ToggleButton from '../../atoms/ToggleButton';
import { IconContext } from 'react-icons';
import {
  MdPlayArrow,
  MdRefresh,
  MdBugReport,
  MdGridOn,
  MdGridOff,
  MdGavel,
} from 'react-icons/md';
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
    <div className="ControlBar">
      <h1>Pathfinding visualizer</h1>
      <div>
        <RadioButtonGroup
          onChange={onChangeValue}
          current={props.selectionMode}
          names="selectionMode"
          values={['departure', 'destination', 'barrier']}
        />
        <div className="ControlBar__Controls">
          <IconContext.Provider
            value={{ className: 'ControlBar__Controls__Icons' }}
          >
            <Button
              onClick={props.onStart}
              useIcon
              tooltip="Start the visualization"
            >
              <MdPlayArrow />
            </Button>
            <Button onClick={props.onReset} useIcon tooltip="Clean the map">
              <MdRefresh />
            </Button>
            <Button
              onClick={props.onDisplayGridChange}
              useIcon
              tooltip={props.displayGrid ? 'Hide the grid' : 'Show the grid'}
            >
              {props.displayGrid ? <MdGridOff /> : <MdGridOn />}
            </Button>
            <Button
              onClick={props.onMazeGenerate}
              useIcon
              tooltip="Generate a maze"
            >
              <MdGavel />
            </Button>
            <ToggleButton
              selected={props.displayNodeDistance}
              toggleSelected={props.onDisplayNodeDistanceChange}
              tooltip="Debug"
            >
              <MdBugReport
                color={props.displayNodeDistance ? 'firebrick' : '#000000'}
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
    </div>
  );
}

ControlBar.propTypes = {
  selectionMode: PropTypes.string,
  algorithms: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayNodeDistance: PropTypes.bool.isRequired,
  displayGrid: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onAlgorithmChange: PropTypes.func.isRequired,
  onSelectionModeChange: PropTypes.func.isRequired,
  onDisplayNodeDistanceChange: PropTypes.func,
  onDisplayGridChange: PropTypes.func,
  onMazeGenerate: PropTypes.func,
};

export default ControlBar;
