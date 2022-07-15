import React from 'react'
import ReactDOM from 'react-dom/client'
import { interpret } from 'xstate'
import App from './App'
import './index.css'
import { GameMachine, GameModel } from './machine/GameMachine'


const machine = interpret(GameMachine).start();

const player1 = machine.send(GameModel.events.join('1','1')).changed;
const player2 = machine.send(GameModel.events.join('2','1')).changed;
console.log('player1 : ',player1);
console.log('player2 : ',player2);



/*
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
*/