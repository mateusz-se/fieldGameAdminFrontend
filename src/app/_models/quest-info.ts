import { Quest } from 'app/_models/quest';
import { Player } from 'app/_models/player';
import { Team } from 'app/_models/team';

export class QuestInfo {

    quest: Quest;
    player: Player;
    team: Team;
    gameName: string;
    teamHash: string;
    otherQuestInfos: QuestInfo[] = [];

    isTeamQuest(): boolean {
        if (this.teamHash == null) {
            return false;
        } else {
            return this.teamHash !== '0';
        }
    }


    getQuestInfos(): QuestInfo[] {
        const quests = [];
        quests.push(this);
        this.otherQuestInfos.forEach(qi => quests.push(qi));
        return quests;
    }
}
