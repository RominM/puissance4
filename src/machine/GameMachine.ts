import { createMachine } from "xstate";
import { createModel } from "xstate/lib/model";
import { GridState, Player, PlayerColor } from "../types";
import { canJoinGuards } from "./Guards";


enum GameStates {
  LOBBY = 'LOBBY',
  PLAY = 'PLAY',
  WIN = 'WIN',
  DRAW = 'DRAW'
}

// Not imperatf to use createModel with XState but, that give you a caring type with TypeScipt => check "events"
export const GameModel = createModel({
  players: [] as Player[],
  currentPlayer: null as null | Player['id'],
  tokenWinLength: 4,
  grid: [
    ['E','E','E','E','E','E','E'],
    ['E','E','E','E','E','E','E'],
    ['E','E','E','E','E','E','E'],
    ['E','E','E','E','E','E','E'],
    ['E','E','E','E','E','E','E'],
    ['E','E','E','E','E','E','E']
  ] as GridState
}, {
  events: {
    join: (playerId: Player['id'], name: Player['name']) => ({playerId, name}),
    leave: (playerId: Player['id']) => ({playerId}),
    chooseColor: (playerId: Player['id'], color: PlayerColor) => ({playerId, color}),
    start: (playerId: Player['id']) => ({playerId}),
    dropToken: (playerId: Player['id'], xPos: number) => ({playerId, xPos}),
    restart: (playerId: Player['id']) => ({playerId}),
  }
});

export const GameMachine = GameModel.createMachine({
  id: 'game',
  context: GameModel.initialContext,
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: { 
          cond: canJoinGuards,
          target: GameStates.LOBBY
        },
        leave: {
          target: GameStates.LOBBY
        },
        chooseColor: {
          target: GameStates.LOBBY
        },
        start: {
          target: GameStates.PLAY
        }
      }
    },
    [GameStates.PLAY]: {
      on: {
        restart: {
          target: '???'
        }
      }
    },
    [GameStates.WIN]: {
      on: {
        dropToken: {
          target: GameStates.LOBBY
        }
      }
    },
    [GameStates.DRAW]: {
      on: {
        dropToken: {
          target: GameStates.LOBBY
        }
      }
    }
  }
});