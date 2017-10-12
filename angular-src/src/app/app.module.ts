import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FoodService } from './services/food.service';
import { AccommodationService } from './services/accommodation.service';
import { HealthcareService } from './services/healthcare.service';
import { OtherService } from './services/other.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaskComponent } from './components/mask/mask.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { AboutUsComponent } from './components/main-container/about-us/about-us.component';
import { TeamComponent } from './components/main-container/team/team.component';
import { ContactComponent } from './components/main-container/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/mask/map/map.component';
import { EventComponent } from './components/main-container/event/event.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'mask', component: MaskComponent },
  { path: 'main-container', component: MainContainerComponent },
  { path: 'map', component: MapComponent },
  { path: 'event', component: EventComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'footer', component: FooterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MaskComponent,
    MainContainerComponent,
    AboutUsComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    MapComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0Aw_AuBepbQ1imricl1iVdkbu7tw8YWQ'
    }),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AgmJsMarkerClustererModule
  ],
  providers: [FoodService, AccommodationService, HealthcareService, OtherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
