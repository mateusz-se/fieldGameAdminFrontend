import { Pipe, PipeTransform } from '@angular/core';
import { Team } from 'app/_models/team';
import { TeamsService } from 'app/_services';

@Pipe({
  name: 'teamName'
})
export class TeamNamePipe implements PipeTransform {

  constructor(private teamsService: TeamsService) {
  }

  transform(value: string, args?: any): any {
    if (!value) {
      return value;
    }
    return this.teamsService.mapTeamName(value);
  }

}
