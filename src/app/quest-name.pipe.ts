import { Pipe, PipeTransform } from '@angular/core';
import { QuestService } from 'app/_services';

@Pipe({
  name: 'questName'
})
export class QuestNamePipe implements PipeTransform {

  constructor(private questService: QuestService) {
  }

  transform(value: string, args?: any): any {
    if (!value) {
      return value;
    }
    return this.questService.getQuestTypeName(value);
  }


}
