import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const classNames = {
  BASE: 'Node',
  VISITED: 'Node_visited',
  DEPARTURE: 'Node_departure',
  DESTINATION: 'Node_destination',
  PATH: 'Node_path',
  BARRIER: 'Node_barrier',
};

function Node(props) {
  const getClasses = () => {
    return [
      classNames.BASE,
      props.isVisited && classNames.VISITED,
      props.isPath && classNames.PATH,
      props.isDeparture && classNames.DEPARTURE,
      props.isDestination && classNames.DESTINATION,
      props.isBarrier && classNames.BARRIER,
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <td
      className={getClasses()}
      style={props.style}
      col={props.col}
      row={props.row}
      onClick={() => props.onSelect(props.col, props.row)}
    >
      {props.displayDistance
        ? props.distance === Infinity
          ? '∞'
          : props.distance
        : ''}
    </td>
  );
}

Node.propTypes = {
  style: PropTypes.object,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  displayDistance: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  isVisited: PropTypes.bool,
  isDeparture: PropTypes.bool,
  isDestination: PropTypes.bool,
  isPath: PropTypes.bool,
  isBarrier: PropTypes.bool,
  predecessor: PropTypes.shape({
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
  }),
};

Node.defaultProps = {
  distance: Infinity,
  displayWeight: false,
  isVisited: false,
  isDeparture: false,
  isDestination: false,
  isPath: false,
  isBarrier: false,
  predecessor: null,
};

export default React.memo(Node);
