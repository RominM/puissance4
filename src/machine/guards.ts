import { GameContext, GameEvent, GameGuard } from "../types";

export const canJoinGuards: GameGuard<"join"> = (context, event ) => {
  return context.players.length < 2 && context.players.find(p => p.id === event.playerId) === undefined;
}