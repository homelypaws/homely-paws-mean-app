import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HealthcareService {
  latitude: number;
  longitude: number;

  constructor(public http: Http) {
    // Get current location
    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    });
  }

  getHealthcares() {
    // const url = 'http://localhost:8080/healthcares/' + this.latitude + '/' + this.longitude;
    const url = 'healthcares/' + this.latitude + '/' + this.longitude;
    console.log('getHealthcares url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getHealthcaresByCategory(category) {
    const url = 'http://localhost:8080/healthcaresByCategory/' + this.latitude + '/' + this.longitude + '/' + category;
    // const url = 'healthcaresByCategory/' + this.latitude + '/' + this.longitude + '/' + category;
    console.log('healthcaresByCategory url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getNearestHealthcare() {
    const url = 'http://localhost:8080/healthcare/' + this.latitude + '/' + this.longitude;
    // const url = 'healthcare/' + this.latitude + '/' + this.longitude;
    console.log('getNearestHealthcare url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getPetHealthcares() {
    const url = 'http://localhost:8080/petHealthcares/' + this.latitude + '/' + this.longitude;
    // const url = 'petHealthcares/' + this.latitude + '/' + this.longitude;
    console.log('getPetHealthcares url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }

  getNearestPetHealthcare() {
    const url = 'http://localhost:8080/petHealthcare/' + this.latitude + '/' + this.longitude;
    // const url = 'petHealthcare/' + this.latitude + '/' + this.longitude;
    console.log('getNearestPetHealthcare url: ' + url);
    return this.http.get(url)
      .map(res => res.json());
  }
}
