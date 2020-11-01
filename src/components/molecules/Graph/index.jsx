import React from 'react';
import PropTypes from 'prop-types';
import Node from '../../atoms/Node';
import './styles.scss';

const classNames = {
  BASE: 'Graph',
};

function Graph(props) {
  function onSelect(col, row) {
    const graph = [...props.graph];

    switch (props.selectionMode) {
      case 'departure':
        graph[row][col].isDeparture = true;
        graph[row][col].weight = 0;
        break;
      case 'destination':
        graph[row][col].isDestination = true;
        break;
      case 'barrier':
        graph[row][col].isBarrier = !graph[row][col].isBarrier; // toggle
        break;
      default:
        break;
    }

    props.onSelectNode(graph[row][col]);
    props.onGraphChange(graph);
  }

  if (props.graph && props.graph.length && props.graph.length > 0) {
    return (
      <table className={classNames.BASE}>
        <tbody>
          {props.graph.map((nodes, row) => (
            <tr key={row}>
              {nodes.map((nodeProps, col) => {
                const maxWidth = Math.floor(
                  props.graph[0].length / window.innerWidth
                );
                const maxHeight = Math.floor(
                  props.graph.length / window.innerHeight
                );
                return (
                  <Node
                    key={`${col}${row}`}
                    style={{
                      maxWidth: `${maxWidth}px`,
                      maxHeight: `${maxHeight}px`,
                    }}
                    displayWeight={props.displayNodeWeight}
                    onSelect={onSelect}
                    {...nodeProps}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <div />;
  }
}

Graph.propTypes = {
  graph: PropTypes.arrayOf(PropTypes.array),
  displayNodeWeight: PropTypes.bool,
  selectionMode: PropTypes.oneOf(['departure', 'destination', 'barrier']),
  onGraphChange: PropTypes.func.isRequired,
  onSelectNode: PropTypes.func.isRequired,
};

Graph.defaultProps = {
  graph: [],
};

export default Graph;
