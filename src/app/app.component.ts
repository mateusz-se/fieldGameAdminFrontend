import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import { MatDialog } from '@angular/material';
import { QuestTemplateDialogComponent } from 'app/quest-template-dialog/quest-template-dialog.component';
import { ActiveGamesService } from 'app/_services';
import { Game } from 'app/_models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private activeGameService: ActiveGamesService
  ) {
    this.currentUser = this.authenticationService.getCurrentUser();
    const currentUserSubscription = this.authenticationService.getCurrenUserSubject()
      .subscribe((value) => this.currentUser = value);
   }
   ngOnInit() {
   }


   openQuestTemplateDialog() {
    const dialogRef = this.dialog.open(QuestTemplateDialogComponent, {
      width: '75%'
    });
   }

   logOut() {
    this.activeGameService.setCurrentGame(new Game());
   }

}
