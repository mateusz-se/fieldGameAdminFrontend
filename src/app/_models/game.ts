import { Team } from '../_models/team';
import { GameState } from '../_models/game-state';
export class Game {
    gameId: number;
    name: string;
    password: string;
    gameState: GameState;
    teams: Team[];
    update: boolean = true;
}
