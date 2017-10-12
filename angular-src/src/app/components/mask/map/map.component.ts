import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude: number;
  longitude: number;
  isOpen: boolean;
  zoom: number;

  // Get data from parent component
  @Input() nearestServiceInMap: any;
  @Input() allServicesInMap: any[];

  // Control which panel is visiable
  @Input() isFoodServiceInMapVisiable: boolean;
  @Input() isAccommodationServiceInMapVisiable: boolean;
  @Input() isHealthcareServiceInMapVisiable: boolean;

  @Input() isNearestServiceSelectedInMap: boolean;
  @Input() areAllServicesSelectedInMap: boolean;

  // deprecated
  @Input() foodInMap: any;
  @Input() foodsInMap: any[];
  isNearestFoodMakerVisiable: boolean;
  areAllFoodMakersVisiable: boolean;

  constructor() {
    this.zoom = 10;
    console.log("Map Init");

  }

  clickedMarker() {
    console.log('Marker clicked');
  }

  mapInfo() {
    // this.areAllFoodMakersVisiable = false;
    // this.isNearestFoodMakerVisiable = true;
    console.log('---------------------------');
    console.log('isNearestServiceSelectedInMap: ' + this.isNearestServiceSelectedInMap);
    console.log('areAllServicesSelectedInMap: ' + this.areAllServicesSelectedInMap);
    console.log('---------------------------');
    console.log('isFoodServiceInMapVisiable: ' + this.isFoodServiceInMapVisiable);
    console.log('isAccommodationServiceInMapVisiable: ' + this.isAccommodationServiceInMapVisiable);
    console.log('isHealthcareServiceInMapVisiable: ' + this.isHealthcareServiceInMapVisiable);
  }

  // setAllFoodMarkers() {
  //   // this.areAllFoodMakersVisiable = true;
  //   // this.isNearestFoodMakerVisiable = false;
  //   console.log('---------------------------');
  //   console.log('isNearestServiceSelectedInMap: ' + this.isNearestServiceSelectedInMap);
  //   console.log('areAllServicesSelectedInMap: ' + this.areAllServicesSelectedInMap);
  //   console.log('---------------------------');
  //   console.log('isFoodServiceInMapVisiable: ' + this.isFoodServiceInMapVisiable);
  //   console.log('isAccommodationServiceInMapVisiable: ' + this.isAccommodationServiceInMapVisiable);
  //   console.log('isHealthcareServiceInMapVisiable: ' + this.isHealthcareServiceInMapVisiable);
  //   window.location.href = '#service-map';
  // }

  ngOnInit() {
    // Get current location
    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.isOpen = true;
      console.log('Your current position is:');
      console.log('Latitude:' + this.latitude);
      console.log('Longitude:' + this.longitude);
    });
  }
}

interface Marker {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isVisiable: boolean;
}
