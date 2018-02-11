import { QuestService } from '../_services/quest.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../_models/game';
import { Quest } from '../_models/quest';
import { Marker } from '../_models/marker';
import { ActiveGamesService, AlertService, MapDataService, TeamsService } from '../_services/index';
import { QuestPresetService } from 'app/_services/quest-preset.service';
import { QuestPreset } from 'app/_models/quest-preset';

@Component({
  selector: 'app-game-add-quest',
  templateUrl: './game-add-quest.component.html',
  styleUrls: ['./game-add-quest.component.css']
})
export class GameAddQuestComponent implements OnInit, OnDestroy  {

      selectedGame: string;
      currentGame: Game;
      quest: Quest;
      recivers: {id: string, name: string}[];
      marker: Marker;

      useTemplate = false;

      selectedTemplate: QuestPreset = new QuestPreset();
      templateList: QuestPreset[];

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private activeGamesService: ActiveGamesService,
        private alertService: AlertService,
        private mapDataService: MapDataService,
        private teamsService: TeamsService,
        private questService: QuestService,
        private questPresetService: QuestPresetService
      ) {
    this.route.params.subscribe( params => this.selectedGame = params['gameName']);
    this.initQuest();
  }

  initQuest() {
    this.quest = new Quest();
    this.quest.points = 5;
    this.quest.radius = 7;
  }

  ngOnInit() {
    this.activeGamesService.currentGame.subscribe(
      game => {
          if (game !== undefined && game !== null) {
              this.currentGame = game;
          }
        },
          error => {
              this.alertService.error(error);
          }
    );
    this.mapDataService.currentMarker.subscribe(marker => {
      this.marker = marker;
      this.quest.cooidinates = marker.lat + ' ' + marker.lng;
    });
    this.questPresetService.getQuestPresets().subscribe(qp => {
        this.templateList = qp;
    });

  }

  ngOnDestroy() {
    this.mapDataService.resetMarker();
  }

  onSubmit() {
    this.questService.add(this.quest, this.currentGame);
    this.alertService.success('Dodano zadanie');
    this.router.navigate(['gameMenu', this.selectedGame]);
  }

  addQuestPreset() {
    this.questPresetService.addPreset(this.quest);
    this.alertService.success('Dodano szablon zadania');
  }

  questTypeChange(event) {
    if (this.quest.reciverType === 'team') {
      this.recivers = [];
      this.currentGame.teams.filter(t => t.players.length > 0).forEach(t => {
        this.recivers.push({id: t.name, name: this.teamsService.mapTeamName(t.name)});
      })
    } else {
      this.recivers = [];
      this.currentGame.teams.forEach(t => {
        t.players.forEach(p => this.recivers.push({id: p.name, name: p.name + ' | ' + this.teamsService.mapTeamName(t.name)}));
      })
    }
  }

  changeTemplate(event) {
    if (this.selectedTemplate == null) {
      this.initQuest();
      this.quest.cooidinates = '0 0';
      this.mapDataService.resetMarker();
    } else {
      this.quest.title = this.selectedTemplate.title;
      this.quest.description = this.selectedTemplate.description;
      this.quest.points = this.selectedTemplate.points;
      this.quest.questType = this.selectedTemplate.questType;
      this.quest.radius = this.selectedTemplate.radius;
      this.marker.lat = this.selectedTemplate.lat;
      this.marker.lng = this.selectedTemplate.lon;
      this.quest.cooidinates = this.marker.lat + ' ' + this.marker.lng;
    }
  }
}
