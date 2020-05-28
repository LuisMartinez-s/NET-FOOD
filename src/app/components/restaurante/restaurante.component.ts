import { Component, OnInit } from '@angular/core';
import{ RestauranteService}  from '../../services/restaurante.service'
import { Restaurante } from 'src/app/models/restaurante';
import { Platillos } from 'src/app/models/platillos';



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  platillo={}as Platillos
  //Arreglo para guardar restauranres y llamarlo en el html
  restaurantes=[];
  //Editar el restaurante
  editingRes:Restaurante;
  //Verifica si presionó edit
  editing = false;
  //Añadir platillos
  addPlatillos:Restaurante;  
  //Verifica si presionó añadir platillo
  adding: Boolean = false;
  restaurante = {} as Restaurante
  platillos_a =[]


  constructor(public restauranteService:RestauranteService) {

   }

  ngOnInit(): void {

    //AQUI SE MUESTRA LO QUE HAY EN LA COLECCIÓN
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>{
      console.log(restaurantes)
      this.restaurantes = restaurantes;
      
    })

  
  }

  deleteRestaurante(event,restaurante){
    if(confirm("¿Seguro qué desea eliminar es restaurante?")){
    this.restauranteService.deleteRestaurante(restaurante);
   }
  }

  deletePlatillo(event,restaurante,platillo){
    //console.log('asa'+platillo.nombre)
    if(confirm("¿Seguro qué desea eliminar este platillo?")){
    this.restauranteService.deletePlatillo(restaurante,platillo);
   }
  }

  getPlatillos(event,restaurante){
    this.restauranteService.getPlatillos(restaurante).subscribe(platillos =>{
      console.log(platillos)
      this.platillos_a = platillos
    })
    
  }

  editRestaurante(event,restaurante){
    this.editingRes = restaurante;
    this.restauranteService.getProm(restaurante)
    this.restauranteService.getRestaurantes().subscribe(platillo =>{
      console.log(platillo)
      this.platillo = platillo as Platillos;
    })
    this.editing = !this.editing;
    

  }

  updateRestaurante(){
    this.restauranteService.updateRestaurante(this.editingRes);
    this.editingRes = {} as Restaurante;
    this.editing = false;
  }

  anadirPlatillo(event,restaurante){
    console.log(restaurante)
    
    this.addPlatillos=restaurante;
    this.adding = !this.adding;
    
  }

  addsPlatillo(){
    console.log(this.addPlatillos)
    
    this.restauranteService.addPlatillo(this.addPlatillos,this.platillo);
    this.addPlatillos={}as Restaurante;
    this.platillo={} as Platillos
    this.adding=false;
    
  }

}
