import cloneDeep from 'lodash/cloneDeep';
import { getNeighbours, createTrace, distance } from './utils';

export default function a(initGraph, departure, destination) {
  let trace = [];
  let path = [];
  let graph = cloneDeep(initGraph);
  const height = graph.length;
  const width = graph[0].length;

  // The set of discovered nodes that may need to be (re-)expanded.
  const openSet = [];

  // Store the scores for each node :
  // score(n) = distance(start, n) + h(n)
  const scores = new Array(height);
  for (let i = 0; i < scores.length; i++) {
    scores[i] = new Array(width).fill(Infinity);
  }

  function init() {
    openSet.push(graph[departure.row][departure.col]);
    scores[departure.row][departure.col] = heuristic(departure, destination);
  }

  function loop() {
    while (openSet.length > 0) {
      const current = getLowestNode(openSet, scores);
      current.isVisited = true;
      if (current === graph[destination.row][destination.col]) {
        return;
      }

      const index = openSet.findIndex((node) => node === current);
      openSet.splice(index, 1);

      for (let neighbour of getNeighbours(current, graph)) {
        if (neighbour.isBarrier) continue;

        const score = current.distance + distance(current, neighbour);

        if (score < neighbour.distance) {
          neighbour.predecessor = { col: current.col, row: current.row };
          neighbour.distance = score;
          scores[neighbour.row][neighbour.col] =
            score + heuristic(neighbour, destination);
          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);
          }
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
  loop();
  path = searchPath();
  trace = createTrace(initGraph, graph, path);

  return trace;
}

function heuristic(node, destination) {
  return distance(node, destination);
}

function getLowestNode(openSet, scores) {
  let lowest = openSet[0];
  openSet.forEach((node) => {
    if (scores[node.row][node.col] < scores[lowest.row][lowest.col]) {
      lowest = node;
    }
  });
  return lowest;
}
