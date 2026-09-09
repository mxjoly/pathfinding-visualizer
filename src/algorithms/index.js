import a from './a';
import dijkstra from './dijkstra';

const algorithms = {
  A: {
    name: 'A*',
    function: a,
  },
  DIJKSTRA: {
    name: 'Dijkstra',
    function: dijkstra,
  },
};

export default algorithms;
