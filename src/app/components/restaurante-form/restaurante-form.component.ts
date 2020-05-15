import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { RestauranteService} from '../../services/restaurante.service'
import { Restaurante } from 'src/app/models/restaurante';
import { Platillos } from 'src/app/models/platillos';



@Component({
  selector: 'app-restaurante-form',
  templateUrl: './restaurante-form.component.html',
  styleUrls: ['./restaurante-form.component.css']
})
export class RestauranteFormComponent implements OnInit {

 public restaurante = {} as Restaurante
  nombreRes:string
  latitud : number
  longitud : number
  

  constructor(public restauranteService:RestauranteService) { 

  }
  

  ngOnInit(): void {
    
  }

  addRestaurante(){
    if(this.restaurante.name!=='' && this.restaurante.name!==''){
      this.restauranteService.addRestaurante(this.restaurante)
      this.restaurante = {} as Restaurante
    }
    
  }
  buscaRestaurante(event, restaurante){
    this.restauranteService.consultaRestaurante(restaurante)
    this.restauranteService.getRestaurantes().subscribe(restaurante =>{
      console.log(restaurante)
      this.restaurante = restaurante as Restaurante;
      
    
      
    })

  }

  //Obtener latitud y longitud
  getLat(){
    return this.restaurante.lat
  }

  getLong(){
    return this.restaurante.lng
  }
 
}
