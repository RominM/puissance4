import { Context } from 'react';
import { ContextFrom, EventFrom } from 'xstate';
import { GameModel } from './machine/GameMachine';

export enum GameStates {
  LOBBY = 'LOBBY',
  PLAY = 'PLAY',
  WIN = 'WIN',
  DRAW = 'DRAW',
}

export enum PlayerColor {
  RED = 'R',
  YELLOW = 'Y',
}

export type Player = {
  id: string;
  name: string;
  color?: PlayerColor;
};

export type EmptyCell = 'E';
export type CellState = `${PlayerColor}` | EmptyCell;
export type GridState = CellState[][];
export type GameContext = ContextFrom<typeof GameModel>;
export type GameEvents = EventFrom<typeof GameModel>;
export type GameEvent<T extends GameEvents['type']> = GameEvents & { type: T };
// smplify the guards
export type GameGuard<T extends GameEvents['type']> = (
  context: GameContext,
  event: GameEvent<T>
) => boolean;

export type GameAction<T extends GameEvents['type']> = (
  context: GameContext,
  event: GameEvent<T>
) => Partial<GameContext>;
