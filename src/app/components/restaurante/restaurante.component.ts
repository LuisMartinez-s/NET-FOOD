import { Component, OnInit } from '@angular/core';
import{ RestauranteService}  from '../../services/restaurante.service'
import { Restaurante } from 'src/app/models/restaurante';



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  //Arreglo para guardar restauranres y llamarlo en el html
  restaurantes=[];
  //Editar el restaurante
  editingRes:Restaurante;
  //Verifica si presionó edit
  editing = false;

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

  editRestaurante(event,restaurante){
    this.editingRes = restaurante;
    this.editing = !this.editing;

  }

  updateRestaurante(){
    this.restauranteService.updateRestaurante(this.editingRes);
    this.editingRes = {} as Restaurante;
    this.editing = false;
  }
 

}
