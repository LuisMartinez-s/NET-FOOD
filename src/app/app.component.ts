import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { CloneVisitor, Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl'; 
import { RestauranteService } from 'src/app/services/restaurante.service';
import {RestauranteFormComponent} from './components/restaurante-form/restaurante-form.component';
import { Restaurante } from 'src/app/models/restaurante';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public coordMap = {} 
  public coordenadas= [] ;
  precio :String;
  currentMarkers=[];
  
  
  constructor(public restauranteService :RestauranteService){};

  map: mapboxgl.Map; 
  
  ngOnInit() {
    this.coordenadas = [] ;

    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.iniciarMapa();

}

    
buscaRestaurante(event, restaurante){
  this.currentMarkers=[];
  this.precio =restaurante;
 // this.restauranteService.precio =this.precio;
  //console.log("Precio a consultar: "+this.precio)

  this.restauranteService.consultaRestaurante(restaurante).subscribe(restaurante=>{
 // this.restauranteService.getRestaurantes().subscribe(restaurante =>{
  this.coordMap = restaurante as Restaurante;
  //this.restauranteService.coordMap =this.coordMap as Restaurante;

  //console.log(this.coordMap.lat)
    console.log(restaurante)
    this.borrarMapa()
    this.iniciarMapa()
    for (let c of restaurante){
      console.log('Coord de restaruantes en consulta:'+c.lat+','+c.lng,c.name); 
       this.crearMarcador(c.lng,c.lat,c.name)  
    }
    console.log("markadores agregados :"+this.currentMarkers.length)
   
   // this.restaurante = restaurante as Restaurante;  
    this.coordMap = restaurante ; 
   // this.restauranteService.coordMap = restaurante ;  
   // console.log(this.restauranteService.coordMap)
   restaurante =[]
    
  })
}


 public crearMarcador(lng:number,lat:number,name:string){
  
  var popup = new mapboxgl.Popup({ offset: 0 })
  .setText("Restaurante: "+name);

  var marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map) ;
        
    this.currentMarkers.push(marker)
}

public iniciarMapa(){
  this.map = new mapboxgl.Map({
    container: 'map-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-104.866611, 21.4769211], // starting position LNG, LAT
    zoom:14 // starting zoom
    });
}

public borrarMapa(){
  this.map.remove();
}


  title = 'Net-Food';
  res = false;
}
