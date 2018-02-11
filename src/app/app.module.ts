import { GameAddQuestComponent } from './game-add-quest/game-add-quest.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginModule } from './login/login.module';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService, AuthenticationService, UserService,
     ActiveGamesService, MessageService,
     TeamsService, GeolocationService, MapDataService,
    QuestService } from './_services/index';
import { HomeComponent } from './home/home.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { GameStarterComponent } from './game-starter/game-starter.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameAddMessageComponent } from './game-add-message/game-add-message.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material/material.module';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamsInfoComponent } from './teams-info/teams-info.component';
import { NotEmptyTeamPipe } from './not-empty-team.pipe';
import { TeamNamePipe } from './team-name.pipe';
import { QuestInfoComponent } from './quest-info/quest-info.component';
import { QuestNamePipe } from './quest-name.pipe';
import { QuestDialogComponent } from './quest-dialog/quest-dialog.component';
import { QuestTemplateDialogComponent } from './quest-template-dialog/quest-template-dialog.component';
import { QuestPresetService } from 'app/_services/quest-preset.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        LoginModule,
        AgmCoreModule.forRoot({
            apiKey: 'GOOGLEMAPSAPIKEY'
        }),
        NoopAnimationsModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        ActiveGamesComponent,
        GameStarterComponent,
        GameMenuComponent,
        GameAddMessageComponent,
        MapComponent,
        GameAddQuestComponent,
        TeamInfoComponent,
        TeamsInfoComponent,
        NotEmptyTeamPipe,
        TeamNamePipe,
        QuestInfoComponent,
        QuestNamePipe,
        QuestDialogComponent,
        QuestTemplateDialogComponent
    ],
    providers: [
       AuthGuard,
       AlertService,
       AuthenticationService,
       UserService,
       ActiveGamesService,
       MessageService,
       TeamsService,
       GeolocationService,
       MapDataService,
       QuestService,
       QuestPresetService
    ],
    entryComponents: [QuestDialogComponent, QuestTemplateDialogComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
