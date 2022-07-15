import { createMachine, interpret, InterpreterFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';
import {
  GameContext,
  GameStates,
  GridState,
  Player,
  PlayerColor,
} from '../types';
import { dropTokenAction, joinGameAction, leaveGameAction } from './actions';
import { canDropGuard, canJoinGuard, canLeaveGuard } from './guards';

// Not imperatf to use createModel with XState but, that give you a caring type with TypeScipt => check "events"
export const GameModel = createModel(
  {
    players: [] as Player[],
    currentPlayer: null as null | Player['id'],
    tokenWinLength: 4,
    grid: [
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ] as GridState,
  },
  {
    events: {
      join: (playerId: Player['id'], name: Player['name']) => ({
        playerId,
        name,
      }),
      leave: (playerId: Player['id']) => ({ playerId }),
      chooseColor: (playerId: Player['id'], color: PlayerColor) => ({
        playerId,
        color,
      }),
      start: (playerId: Player['id']) => ({ playerId }),
      dropToken: (playerId: Player['id'], xPos: number) => ({ playerId, xPos }),
      restart: (playerId: Player['id']) => ({ playerId }),
    },
  }
);

export const GameMachine = GameModel.createMachine({
  id: 'game',
  context: GameModel.initialContext,
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: {
          cond: canJoinGuard,
          actions: [GameModel.assign(joinGameAction)],
          target: GameStates.LOBBY,
        },
        leave: {
          cond: canLeaveGuard,
          actions: [GameModel.assign(leaveGameAction)],
          target: GameStates.LOBBY,
        },
        chooseColor: {
          target: GameStates.LOBBY,
        },
        start: {
          target: GameStates.PLAY,
        },
      },
    },
    [GameStates.PLAY]: {
      on: {
        dropToken: {
          cond: canDropGuard,
          target: GameStates.WIN,
          actions: [GameModel.assign(dropTokenAction)],
        },
      },
    },
    [GameStates.WIN]: {
      on: {
        restart: {
          target: GameStates.LOBBY,
        },
      },
    },
    [GameStates.DRAW]: {
      on: {
        restart: {
          target: GameStates.LOBBY,
        },
      },
    },
  },
});

export function makeGame(
  state: GameStates = GameStates.LOBBY,
  context: Partial<GameContext> = {}
): InterpreterFrom<typeof GameMachine> {
  const machine = interpret(
    GameMachine.withContext({
      ...GameModel.initialContext,
      ...context,
    })
  ).start();
  machine.state.value = state;

  return machine;
}
