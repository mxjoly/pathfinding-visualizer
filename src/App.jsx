import { useEffect, useState } from 'react';
import './App.scss';

import Graph from './components/molecules/Graph';
import ControlBar from './components/organisms/ControlBar';
import algorithms from './algorithms';

const selectionModes = {
  DEPARTURE: 'departure',
  DESTINATION: 'destination',
  BARRIER: 'barrier',
};

function App() {
  const [algorithm, setAlgorithm] = useState(algorithms.DIJKSTRA);
  const [graph, setGraph] = useState([]);
  const [displayNodeWeight, setDisplayNodeWeight] = useState(false);
  const [selectionMode, setSelectionMode] = useState(selectionModes.DEPARTURE);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [departurePos, setDeparturePos] = useState(null);
  const [destinationPos, setDestinationPos] = useState(null);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithms]);

  // This function is used to generate a table on different screen with boxes as squares
  function calculateGraphDim() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    function greatestCommonDivisor(x, y) {
      if (typeof x !== 'number' || typeof y !== 'number') return false;
      x = Math.abs(x);
      y = Math.abs(y);
      while (y) {
        var t = y;
        y = x % y;
        x = t;
      }
      return x > 30 ? x : 30; // The minimal size of the table boxes is 20px
    }

    const gcd = greatestCommonDivisor(w, h);
    const tableW = Math.floor(w / gcd);
    const tableH = Math.floor(h / gcd);
    return [tableW, tableH];
  }

  function reset() {
    clearTimeouts();
    resetGraph();
    setTimeoutIds([]);
    setSelectionMode(selectionModes.DEPARTURE);
    setDestinationPos(null);
    setDestinationPos(null);
  }

  function resetGraph() {
    // Calculate the best dimension for the table boxes
    const [width, height] = calculateGraphDim();

    // Init a two dimensionnal array as the graph
    let graph = Array(height)
      .fill(0)
      .map((_, row) =>
        Array(width)
          .fill(0)
          .map((_, col) => {
            return {
              col,
              row,
              weight: Infinity,
              predecessor: null,
              isVisited: false,
              isDeparture: false,
              isDestination: false,
              isPath: false,
              isBarrier: false,
            };
          })
      );

    // Update the state
    setGraph(graph);
  }

  function searchPath() {
    return new Promise((resolve, reject) => {
      if (algorithm) {
        const trace = algorithm.function(graph, departurePos, destinationPos);
        if (trace) {
          resolve(trace);
        } else {
          reject('Something went wrong when searching the path');
        }
      } else {
        reject('Cannot find the pathfinding algorithm');
      }
    });
  }

  function visualize(trace) {
    let timeoutIds = [];
    const speed = 25;

    // Create the timeouts
    trace.forEach((graph, i) => {
      let timeoutId = setTimeout(() => {
        setGraph(graph);
      }, i * speed);
      timeoutIds.push(timeoutId);
    });

    setTimeoutIds(timeoutIds);
  }

  function clearTimeouts() {
    timeoutIds.forEach((timeoutId) => {
      clearInterval(timeoutId);
    });
    setTimeoutIds([]);
  }

  function onStart() {
    if (departurePos && destinationPos) {
      searchPath()
        .then((trace) => {
          visualize(trace);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('You must create a departure and a destination.');
    }
  }

  function onSelectionMode(mode) {
    if (Object.values(selectionModes).includes(mode)) {
      setSelectionMode(mode);
    } else {
      console.warn('The selection mode is unknown');
    }
  }

  function onSelectNode({ col, row, isDeparture, isDestination, isBarrier }) {
    if (isDeparture) {
      if (departurePos) {
        Object.assign(graph[departurePos.row][departurePos.col], {
          isDeparture: false,
          weight: Infinity,
        });
      }
      setDeparturePos({ col, row });
    } else if (isDestination) {
      if (destinationPos) {
        Object.assign(graph[destinationPos.row][destinationPos.col], {
          isDestination: false,
          weight: Infinity,
        });
      }
      setDestinationPos({ col, row });
    }
  }

  function onAlgorithmChange(algorithmName) {
    const isValidAlgorithm = Object.keys(algorithms)
      .map((name) => name.toLowerCase())
      .includes(algorithmName.toLowerCase());

    if (isValidAlgorithm) {
      switch (algorithmName.toLowerCase()) {
        case 'dijkstra':
          return setAlgorithm(algorithms.DIJKSTRA);
        default:
          return;
      }
    } else {
      console.warn('Unknown algorithm name :', algorithmName);
    }
  }

  return (
    <div className="App">
      <ControlBar
        algorithms={Object.keys(algorithms).map((name) => {
          return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        })}
        displayNodeWeight={displayNodeWeight}
        onStart={onStart}
        onReset={reset}
        onAlgorithmChange={onAlgorithmChange}
        onSelectionModeChange={onSelectionMode}
        onDisplayNodeWeight={() => setDisplayNodeWeight(!displayNodeWeight)}
      />
      <Graph
        graph={graph}
        displayNodeWeight={displayNodeWeight}
        selectionMode={selectionMode}
        onGraphChange={setGraph}
        onSelectNode={onSelectNode}
      />
    </div>
  );
}

export default App;
