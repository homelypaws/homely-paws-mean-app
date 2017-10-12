import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;

  constructor() {
    this.zoom = 14;
  }

  ngOnInit() {

    // Monash University Caulfield Campus Location
    this.latitude = -37.877010;
    this.longitude = 145.044267;
  }

}
