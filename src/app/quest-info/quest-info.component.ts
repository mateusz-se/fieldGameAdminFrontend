import { Component, OnInit } from '@angular/core';
import { Quest } from 'app/_models/quest';
import { ActiveGamesService } from 'app/_services';
import { MatDialog } from '@angular/material';
import { QuestDialogComponent } from 'app/quest-dialog/quest-dialog.component';
import { QuestInfo } from 'app/_models/quest-info';
import { QuestService } from 'app/_services/quest.service';

@Component({
  selector: 'app-quest-info',
  template: `
  <mat-card *ngIf="questInfos.size > 0" style="margin-right: 10px;">
    <mat-card-header>
      <mat-card-title><strong>Aktywne zadania</strong></mat-card-title>
    </mat-card-header>
    <mat-card-content style="height: 200px; overflow-y: auto" >
      <mat-list role="list">
        <mat-list-item *ngFor="let quest of questInfos" role="listitem">
          <button mat-button (click)="openDialog(quest)">
            <span>{{quest.quest.title}}: {{quest.quest.questType | questName}} | {{quest.team.name | teamName}}</span>
            <span *ngIf="quest.quest.teamHash === '0'"> | {{quest.player.name}}</span>
          </button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
  <mat-card *ngIf="finishedQuestInfos.size > 0">
    <mat-card-header>
      <mat-card-title><strong>Zakończone zadania</strong></mat-card-title>
    </mat-card-header>
    <mat-card-content style="height: 200px; overflow-y: auto" >
      <mat-list role="list">
        <mat-list-item *ngFor="let quest of finishedQuestInfos" role="listitem">
          <button mat-button (click)="openDialog(quest)">
            <span>{{quest.quest.title}}: {{quest.quest.questType | questName}} | {{quest.team.name | teamName}}</span>
            <span *ngIf="quest.quest.teamHash === '0'"> | {{quest.player.name}}</span>
          </button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./quest-info.component.css']
})
export class QuestInfoComponent implements OnInit {

  questInfos = new Set<QuestInfo>();

  finishedQuestInfos = new Set<QuestInfo>();

  previousImageIds: number[];

  constructor(private activeGamesService: ActiveGamesService,
    private questService: QuestService,
     private dialog: MatDialog) { }

  ngOnInit() {
    this.activeGamesService.currentGame.subscribe(game => {
      if (game.gameId != null) {
        const teams = game.teams;
        this.questInfos.clear();
        this.finishedQuestInfos.clear();
        teams.forEach(t => {
          t.players.forEach(p => {
            p.quests.forEach(q => {
              const questInfo = new QuestInfo();
              questInfo.quest = q;
              questInfo.player = p;
              questInfo.team = t;
              questInfo.gameName = game.name;
              questInfo.teamHash = q.teamHash;
              if (q.finished) {
                if (questInfo.isTeamQuest()) {
                  const foundQi = this.containsQuestWithSameHashTeam(questInfo, this.finishedQuestInfos);
                  if (foundQi == null) {
                    this.finishedQuestInfos.add(questInfo);
                  } else {
                    foundQi.otherQuestInfos.push(questInfo);
                  }
                } else {
                  this.finishedQuestInfos.add(questInfo);
                }
              } else {
                if (questInfo.isTeamQuest()) {
                  const foundQi = this.containsQuestWithSameHashTeam(questInfo, this.questInfos);
                  if (foundQi == null) {
                    this.questInfos.add(questInfo);
                  } else {
                    foundQi.otherQuestInfos.push(questInfo);
                  }
                } else {
                  this.questInfos.add(questInfo);
                }
              }
            })
          });
        });
        this.openDialogIfNewImage();
      } else {
        this.previousImageIds = null;
      }
    })
  }

  openDialogIfNewImage() {
    const onlyAppend = this.previousImageIds == null;
    if (onlyAppend) {
      this.previousImageIds = [];
    }
    this.questInfos.forEach(qi => {
      qi.getQuestInfos().forEach(info => {
        this.questService.getQuestPicturesIds(info).subscribe(data => {
          const ids: number[] = data;
          if (onlyAppend) {
            ids.forEach(id => this.previousImageIds.push(id));
          } else {
            for (const id of ids) {
              if (this.previousImageIds.indexOf(id) === -1) {
                this.previousImageIds.push(id);
                this.openDialog(qi);
              }
            }
          }
        });
      })
    })
  }

  containsQuestWithSameHashTeam(questInfo: QuestInfo, infos: Set<QuestInfo>): QuestInfo {
    for (const qi of Array.from(infos)) {
      if (qi.teamHash === questInfo.teamHash) {
        return qi;
      }
    }
    return null;
  }


  openDialog(quest: QuestInfo): void {
    const dialogRef = this.dialog.open(QuestDialogComponent, {
      width: '50%',
      data: { quest: quest }
    });

  }

}
