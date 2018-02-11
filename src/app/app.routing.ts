import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { GameStarterComponent } from './game-starter/game-starter.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameAddQuestComponent } from './game-add-quest/game-add-quest.component';
import { GameAddMessageComponent } from './game-add-message/game-add-message.component'



const appRoutes: Routes = [
    { path: '', component: ActiveGamesComponent , canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'gameSetup', component: GameStarterComponent , canActivate: [AuthGuard]},
    { path: 'gameMenu/:gameName', component: GameMenuComponent , canActivate: [AuthGuard]},
    { path: 'gameAddQuest/:gameName', component: GameAddQuestComponent , canActivate: [AuthGuard]},
    { path: 'gameAddMessage/:gameName', component: GameAddMessageComponent , canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules});
