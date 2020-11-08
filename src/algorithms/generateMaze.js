import cloneDeep from 'lodash/cloneDeep';
import { getNeighbours } from './utils';

export default function generateMaze(initialGraph) {
  const graph = cloneDeep(initialGraph);
  const stack = [];

  function init() {
    const initialCell = graph[1][1];
    initialCell.isVisited = true;
    stack.push(initialCell);
    // Set the walls
    graph.forEach((row, j) => {
      row.forEach((node, i) => {
        node.isBarrier = i % 2 === 0 || j % 2 === 0;
      });
    });
  }

  function main() {
    while (stack.length > 0) {
      const cell = stack.pop();

      const neighbours = getNeighbours(cell, graph, 2);
      const isAllNeighboursVisited = !neighbours.some(
        (neighbour) => !neighbour.isVisited
      );

      if (!isAllNeighboursVisited) {
        // Push the current cell to the stack
        stack.push(cell);

        // Choose one of the unvisited neighbours
        const randIndex = Math.floor(Math.random() * neighbours.length);
        const rand = neighbours[randIndex];

        // Remove the wall between the current cell and the chosen cell
        Object.assign(
          graph[(rand.row + cell.row) / 2][(rand.col + cell.col) / 2],
          { isBarrier: false }
        );
        // Mark the chosen cell as visited and push it to the stack
        rand.isVisited = true;
        stack.push(rand);
      }
    }
  }

  init();
  main();

  // Remove the visited states
  graph.forEach((row) => {
    row.forEach((node) => {
      node.isVisited = false;
    });
  });

  return graph;
}
