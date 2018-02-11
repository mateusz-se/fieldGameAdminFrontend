import { Component, OnInit, EventEmitter } from '@angular/core';

import { GeolocationService, MapDataService } from '../_services/index';
import { MarkerManager } from '@agm/core';
import { Marker } from '../_models/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 51.673858;
  lng = 7.815982;

  marker: Marker;

  playerMarkers: Marker[] = [];

  constructor(private geolocationService: GeolocationService,
  private mapDataService: MapDataService
  ) { }

  ngOnInit() {
    this.geolocationService.getCurrentPosition()
    .forEach((position: Position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
      this.mapDataService.currentMarker.subscribe(marker => this.marker = marker);
      this.mapDataService.playerMarkers.subscribe(pm => this.playerMarkers = pm);
  }

  mapClicked(event) {
    this.marker = new Marker();
    this.marker.lat = event.coords.lat;
    this.marker.lng = event.coords.lng;
    this.mapDataService.changeCurrentMarker(this.marker.lat, this.marker.lng);
  }
}
