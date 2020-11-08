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
