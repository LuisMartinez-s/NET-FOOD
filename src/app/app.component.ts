import { Component, OnInit } from '@angular/core';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  map: mapboxgl.Map; 
  ngOnInit() {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    (mapboxgl as any).accessToken = environment.mapboxKey;

   this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-104.86456613747386, 21.48390635335265], // starting position
      zoom:15 // starting zoom
    });
    this.crearMarcador(-104.86025727190399, 21.48390635335265);
  }

  crearMarcador(lng:number,lat:number){
    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.map);
      marker.on('drag',()=>{
      console.log(marker.getLngLat());
    })
  }
  title = 'Net-Food';
  res = false;

}
