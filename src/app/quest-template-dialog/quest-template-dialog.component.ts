import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { QuestPresetService } from 'app/_services/quest-preset.service';
import { QuestPreset } from 'app/_models/quest-preset';

@Component({
  selector: 'app-quest-template-dialog',
  templateUrl: './quest-template-dialog.component.html',
  styleUrls: ['./quest-template-dialog.component.css']
})
export class QuestTemplateDialogComponent implements OnInit {

  questPresets: QuestPreset[];

  constructor(public dialogRef: MatDialogRef<QuestTemplateDialogComponent>,
  private questPresetService: QuestPresetService) { }

  ngOnInit() {
    this.questPresetService.getQuestPresets().subscribe(data => {
      this.questPresets = data;
    })
  }

  removePreset(questPreset: QuestPreset) {
    this.questPresetService.removeQuestPreset(questPreset).subscribe(data => {
      this.ngOnInit();
    });
  }
}
