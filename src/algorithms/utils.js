import cloneDeep from 'lodash/cloneDeep';

export function getAllNodes(graph) {
  return Object.values(graph).reduce((list, current) => {
    list = list.concat(current);
    return list;
  }, []);
}

export function getNeighbours(node, graph, scale = 1) {
  const { col, row } = node;
  return [
    // Horizontal
    isNeighbours(col - scale, row, graph) && graph[row][col - scale],
    isNeighbours(col + scale, row, graph) && graph[row][col + scale],
    // Vertical
    isNeighbours(col, row - scale, graph) && graph[row - scale][col],
    isNeighbours(col, row + scale, graph) && graph[row + scale][col],
  ].filter(Boolean);
}

export function isNeighbours(col, row, graph) {
  const height = graph.length;
  const width = graph[0].length;
  return col >= 0 && col < width && row >= 0 && row < height;
}

export function getUnvisitedNeighbours(node, graph, scale = 1) {
  return getNeighbours(node, graph, scale).filter((node) => !node.isVisited);
}

export function distance(nodeA, nodeB) {
  return Math.sqrt(
    Math.pow(nodeB.col - nodeA.col, 2) + Math.pow(nodeB.row - nodeA.row, 2)
  );
}

export function createTrace(initGraph, finalGraph, path) {
  let trace = [];
  let graph = cloneDeep(initGraph);
  let sortedNodes = [];

  // Sort and group all the node by their distance
  getAllNodes(finalGraph)
    .filter((node) => node.isBarrier === false)
    .forEach((node) => {
      if (isFinite(node.distance)) {
        if (!sortedNodes[node.distance]) {
          sortedNodes[node.distance] = [];
        }
        sortedNodes[node.distance].push(node);
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
