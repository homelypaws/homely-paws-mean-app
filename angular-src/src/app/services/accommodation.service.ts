import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationService {
  latitude: number;
  longitude: number;

  constructor(public http: Http) {
    // Get current location
    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    });
  }

  getAccommodations() {
    const url = 'http://localhost:8080/accommodations/' + this.latitude + '/' + this.longitude;
    // const url = 'accommodations/' + this.latitude + '/' + this.longitude;
    console.log('getAccommodations url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getNearestAccommodation() {
    const url = 'http://localhost:8080/accommodation/' + this.latitude + '/' + this.longitude;
    // const url = 'accommodation/' + this.latitude + '/' + this.longitude;
    console.log('getNearestAccommodation url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getEmergencyPetBoardings() {
    const url = 'http://localhost:8080/emergencyPetBoardings/' + this.latitude + '/' + this.longitude;
    // const url = 'emergencyPetBoardings/' + this.latitude + '/' + this.longitude;
    console.log('getEmergencyPetBoardings url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getNearestEmergencyPetBoarding() {
    const url = 'http://localhost:8080/emergencyPetBoarding/' + this.latitude + '/' + this.longitude;
    // const url = 'emergencyPetBoarding/' + this.latitude + '/' + this.longitude;
    console.log('getNearestEmergencyPetBoarding url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }


}
