import { freePositionY } from '../func/game';
import { GameAction } from '../types';

export const joinGameAction: GameAction<'join'> = (context, event) => ({
  players: [...context.players, { id: event.playerId, name: event.name }],
});

export const leaveGameAction: GameAction<'leave'> = (context, event) => ({
  players: context.players.filter((p) => p.id != event.playerId),
});

export const dropTokenAction: GameAction<'dropToken'> = (
  { grid, players },
  { xPos, playerId }
) => {
  const PlayerColor = players.find((p) => playerId === p.id)!.color!;
  const yPos = freePositionY(grid, xPos);
  const newGrid = grid.map((row, y) =>
    row.map((value, x) => (x === xPos && y === yPos ? PlayerColor : value))
  );
  return {
    grid: newGrid,
  };
};
