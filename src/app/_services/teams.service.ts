import { Injectable } from '@angular/core';
import { Team } from '../_models/team';
@Injectable()
export class TeamsService {

    getAllTeams(): Array<Team> {
        const teamsMap: Array<Team> = [
            new Team('yellow', 'Żółci', false),
            new Team('red', 'Czerwoni', false),
            new Team('blue', 'Niebiescy', false),
            new Team('green', 'Zieloni', false),
            new Team('pink', 'Różowi', false),
          ];
          return teamsMap;
    }

    mapTeamName(teamName: string) {
        return this.getAllTeams()
          .find(team => team.name === teamName)
          .label;
      }
}
