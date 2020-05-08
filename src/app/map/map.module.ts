import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import {GoogleMapsModule} from '@angular/google-maps';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    GoogleMapsModule
  ]
})
export class MapModule {
  
 }
