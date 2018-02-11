import { Player } from './player';
export class Team {
    teamId: string;
    name: string;
    label: string;
    checked: boolean;
    players: Player[];
    public constructor(name: string, label: string, checked: boolean) {
        this.name = name;
        this.label = label;
        this.checked = checked;
 }

}
