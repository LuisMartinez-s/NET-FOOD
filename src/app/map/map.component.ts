import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteFormComponent } from '../components/restaurante-form/restaurante-form.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  rest : RestauranteFormComponent;

  constructor() {
    
   }

  ngOnInit(): void {
    
    console.log(this.rest.getLat())
  
  }

  //Pocisión del marcador
  position = {
    lat:2,
    lng:2
  };
  
  //Color del marcador
  label={
    color:'red',
  }

}
