import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { Game } from '../_models/game';
import { ActiveGamesService, AlertService, MessageService, TeamsService } from '../_services/index';

@Component({
  selector: 'app-game-add-message',
  templateUrl: './game-add-message.component.html',
  styleUrls: ['./game-add-message.component.css']
})
export class GameAddMessageComponent implements OnInit {

    selectedGame: string;

    message: Message;

    currentGame: Game;

    showReciverSelect = true;

    recivers: {id: string, name: string}[];

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private activeGamesService: ActiveGamesService,
        private alertService: AlertService,
        private messageService: MessageService,
        private teamsService: TeamsService
      ) {
    this.route.params.subscribe( params => this.selectedGame = params['gameName']);
    this.message = new Message();
  }

  ngOnInit() {
    this.activeGamesService.currentGame.subscribe(
      game => {
          if (game !== undefined && game !== null) {
              this.currentGame = game;
              console.log(this.currentGame);
          }
        },
          error => {
              this.alertService.error(error);
          });

  }

  onSubmit() {
    this.messageService.send(this.currentGame, this.message);
    this.alertService.success('Wysłano wiadmość');
    this.router.navigate(['gameMenu', this.selectedGame]);
  }
  messageTypeChange(event) {
    if (this.message.type === 'all') {
      this.showReciverSelect = false;
      this.recivers = [];
      this.recivers.push({id: 'all', name: 'all'});
    } else if (this.message.type === 'team') {
      this.showReciverSelect = true;
      this.recivers = [];
      this.currentGame.teams.filter(t => t.players.length > 0)
      .forEach(t => {
        this.recivers.push({id: t.name, name: this.teamsService.mapTeamName(t.name)});
      })
    } else if (this.message.type === 'player') {
      this.showReciverSelect = true;
      this.recivers = [];
      this.currentGame.teams.forEach(t => {
        t.players.forEach(p => this.recivers.push({id: p.name, name: p.name + ' | ' + this.teamsService.mapTeamName(t.name)}));
      })
    }
    this.message.reciver = '';
  }

}
