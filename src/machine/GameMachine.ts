import { createMachine } from "xstate";

enum GameStates {
  LOBBY = 'LOBBY',
  PLAY = 'PLAY',
  WIN = 'WIN',
  DRAW = 'DRAW'
}

export const GameMachine = createMachine({
  id: 'game',
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: { 
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