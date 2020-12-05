import cloneDeep from 'lodash/cloneDeep';
import { getAllNodes, getUnvisitedNeighbours, createTrace } from './utils';

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

      for (const neighbour of getUnvisitedNeighbours(min, graph)) {
        if (neighbour.distance > min.distance + 1) {
          neighbour.distance = min.distance + 1;
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

function getNearestNode(nodes) {
  return nodes.sort((a, b) => a.distance - b.distance)[0];
}
