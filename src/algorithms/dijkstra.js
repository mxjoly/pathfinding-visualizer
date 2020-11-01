import cloneDeep from 'lodash/cloneDeep';

export default function dijkstra(initGraph, departure, destination) {
  let trace = [];
  let path = [];
  let graph = cloneDeep(initGraph);
  let N = []; // unvisited nodes

  function init() {
    N = getAllNodes(graph).filter((node) => node.isBarrier === false);
  }

  function updateUnvisitedNeighbours() {
    while (
      N.length > 0 &&
      N.some(
        (node) => node.col === destination.col && node.row === destination.row
      )
    ) {
      const min = getNearestNode(N);
      min.isVisited = true;
      N = N.filter((node) => node !== min);

      for (const neighbour of getUnvisitedNeightbours(min, graph)) {
        if (neighbour.weight > min.weight + 1) {
          neighbour.weight = min.weight + 1;
          neighbour.predecessor = { col: min.col, row: min.row };
        }
      }
    }
  }

  function searchPath() {
    let path = [];
    let startNode = graph[departure.row][departure.col];
    let destNode = graph[destination.row][destination.col];
    let current = destNode;

    while (current !== startNode) {
      path.push(current);
      if (!current.predecessor) break;
      current = graph[current.predecessor.row][current.predecessor.col];
    }

    return path;
  }

  init();
  updateUnvisitedNeighbours();
  path = searchPath();
  trace = createTrace(initGraph, graph, path);

  return trace;
}

function getAllNodes(graph) {
  return Object.values(graph).reduce((list, current) => {
    list = list.concat(current);
    return list;
  }, []);
}

function getNearestNode(nodes) {
  return nodes.sort((a, b) => a.weight - b.weight)[0];
}

function getUnvisitedNeightbours(node, graph) {
  const height = graph.length;
  const width = graph[0].length;
  const { col, row } = node;
  return [
    row - 1 > -1 && !graph[row - 1][col].isVisited && graph[row - 1][col],
    row + 1 < height && !graph[row + 1][col].isVisited && graph[row + 1][col],
    col - 1 > -1 && !graph[row][col - 1].isVisited && graph[row][col - 1],
    col + 1 < width && !graph[row][col + 1].isVisited && graph[row][col + 1],
  ].filter(Boolean);
}

function createTrace(initGraph, finalGraph, path) {
  let trace = [];
  let graph = cloneDeep(initGraph);
  let sortedNodes = [];

  // Sort and group all the node by their weight
  getAllNodes(finalGraph)
    .filter((node) => node.isBarrier === false)
    .forEach((node) => {
      if (isFinite(node.weight)) {
        if (!sortedNodes[node.weight]) {
          sortedNodes[node.weight] = [];
        }
        sortedNodes[node.weight].push(node);
      }
    });

  // Create the trace before searching the path
  for (let i = 1; i < sortedNodes.length; i++) {
    sortedNodes[i].forEach((node) => {
      graph[node.row][node.col] = node;
    });
    trace.push(cloneDeep(graph));
  }

  // Create the trace of the path
  for (const node of path) {
    if (graph[node.row][node.col].isDestination === false) {
      graph[node.row][node.col].isPath = true;
      trace.push(cloneDeep(graph));
    }
  }

  return trace;
}
