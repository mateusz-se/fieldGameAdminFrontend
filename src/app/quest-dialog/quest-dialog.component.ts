import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Quest } from 'app/_models/quest';
import { QuestService } from 'app/_services';
import { QuestInfo } from 'app/_models/quest-info';
import { SessionStorage } from 'ngx-webstorage';
import { last } from 'rxjs/operator/last';

@Component({
  selector: 'app-quest-dialog',
  template: `
  <h2 mat-dialog-title>{{currentQuest.quest.title}}</h2>
  <mat-dialog-content>
    <div>
      <p>Typ: {{currentQuest.quest.questType | questName}}</p>
      <p>Rodzaj: {{currentQuest.quest.teamHash === '0' ? 'Indywidualny' : 'Drużynowy'}}</p>
      <p>Drużyna: {{currentQuest.team.name | teamName}}</p>
      <p>Punkty: {{currentQuest.quest.points}}</p>
      <p>Promień: {{currentQuest.quest.radius}}(m)</p>
      <p>Opis: {{currentQuest.quest.description}}</p>
      <div *ngFor="let questImage of questImages">
        <img src="data:image/JPEG;base64,{{questImage.photo}}" width="75%">
        <span>Wysłane przez: {{questImage.uploaderName}}</span>
      </div>
    </div>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true" *ngIf="isQuestFindArtifact()
    &&  hasNewPhoto() && !currentQuest.quest.finished" (click)="finish()">Akceptuj</button>
    <button mat-button [mat-dialog-close]="true" *ngIf="isQuestFindArtifact()
    &&  hasNewPhoto() && !currentQuest.quest.finished" (click)="reject()">Odrzuć</button>
    <button mat-button mat-dialog-close>Anuluj</button>
  </mat-dialog-actions>
  `,
  styleUrls: ['./quest-dialog.component.css']
})
export class QuestDialogComponent implements OnInit {
  currentQuest: QuestInfo;
  questImages: any[] = [];

  @SessionStorage('rejectedIds')
  private rejectedIds;

  constructor(public dialogRef: MatDialogRef<QuestDialogComponent>,
    private questService: QuestService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentQuest = data.quest;
     }


  ngOnInit() {
    if (this.isQuestFindArtifact()) {
      this.currentQuest.getQuestInfos().forEach(qi => {
        this.questService.getQuestPicturesIds(qi).subscribe(data => {
          const ids: number[] = data;
          ids.forEach(id => {
            this.questService.getQuestPictures(qi, id).subscribe(img => {
              img.uploaderName = qi.player.name;
              this.questImages.push(img);
            });
          });
      })
      })
    }
  }

  finish() {
    this.currentQuest.getQuestInfos().forEach(qi => {
      this.questService.finishQuest(qi);
    });
  }

  reject() {
    if (this.questImages.length > 0) {
      if (this.rejectedIds == null) {
        this.rejectedIds = [];
      }
      this.questImages.forEach(img => {
        if (this.rejectedIds.indexOf(img.id) === -1) {
          this.rejectedIds.push(img.id);
        }
      })
    }
    this.currentQuest.getQuestInfos().forEach(qi => {
      this.questService.rejectPhoto(qi);
    });
  }

  isQuestFindArtifact() {
    return this.currentQuest.quest.questType === 'findArtifact';
  }

  hasNewPhoto() {
    if (this.rejectedIds != null && this.rejectedIds.length > 0) {
      const imgCount = this.questImages.length;
      let sameIdsCount = 0;
      this.questImages.forEach(i => {
        if (this.rejectedIds.indexOf(i.id) > -1) {
          sameIdsCount++;
        };
      })
      return sameIdsCount !== imgCount;
    }
    return this.questImages.length > 0;
  }
}
