import { GridState } from '../types';

const empty = 'E';

export const freePositionY = (grid: GridState, xPos: number) => {
  for (let yPos = grid.length - 1; yPos >= 0; yPos--) {
    if (grid[yPos][xPos] === empty) {
      return yPos;
    }
  }
  return -1;
};
