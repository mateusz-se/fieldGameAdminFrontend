import { Pipe, PipeTransform } from '@angular/core';
import { Team } from 'app/_models/team';
import { TeamsService } from 'app/_services';

@Pipe({
  name: 'notEmptyTeam'
})
export class NotEmptyTeamPipe implements PipeTransform {

  transform(value: Team[], filter: Object): any {
    if (!value) {
      return value;
    }
    return value.filter(t => t.players.length !== 0);
  }

}
