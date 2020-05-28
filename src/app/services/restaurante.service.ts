import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante';
import { Platillos } from 'src/app/models/platillos';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  restaurantesCollection: AngularFirestoreCollection<Restaurante>;
  restaurantesCollectionG:AngularFirestoreCollectionGroup<Restaurante>;
  platillosCollectionG:AngularFirestoreCollectionGroup<Platillos>;
  platillosCollection:AngularFirestoreCollection<Platillos>;
  restaurantes: Observable<Restaurante[]>;
  platillos: Observable<Platillos[]>;
  platillosA: Platillos[]
  restauranteDoc: AngularFirestoreDocument<Restaurante>;
  platillosDoc: AngularFirestoreDocument<Platillos>;
  prom = 0;

  constructor(public db: AngularFirestore) {
    //Obtener valores de la coleccion
    //this.products = this.db.collection('products').valueChanges()

    this.restaurantesCollection = this.db.collection('restaurante');
    this.restaurantes = this.restaurantesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Restaurante
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    
  }
 
  //Método que retorna todos los Restaurantes
  getRestaurantes() {
    return this.restaurantes
  }



  //Método que permite Agregar Restaurante
  addRestaurante(restaurante: Restaurante) {
    this.restaurantesCollection.add({
      'name': restaurante.name,
      'lat': restaurante.lat,
      'lng': restaurante.lng,
      'prom':0,
      'cantidad':0,
      'total':0
    });

    
  }
  //Promedio de precio
  //Metodo que obtiene los platillos de un Restaurante
  getProm(restaurante:Restaurante){
    var prom = 0 
    this.platillosCollectionG = this.db.collectionGroup('platillos',ref=>ref.firestore.collectionGroup(`${restaurante.id}`));
    this.platillos = this.platillosCollectionG.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Platillos
        data.id = a.payload.doc.id;
        return data;
      })
    }));  

   
  }
  //Método que permite Eliminar Restaurante
  deleteRestaurante(restaurante: Restaurante) {
    //Obtiene el id del Restaurante
    this.restauranteDoc = this.db.doc(`restaurante/${restaurante.id}`);
    this.restauranteDoc.delete()
  }
//Método que permite Actualizar Restaurante
  updateRestaurante(restaurante: Restaurante) {
    this.restauranteDoc = this.db.doc(`restaurante/${restaurante.id}`);
    this.restauranteDoc.update(restaurante);
  }
  //Método que permite Consultar Restaurante
  consultaRestaurante(precio: string) {
    /*this.restaurantesCollectionG = this.db.collectionGroup('platillos',ref => ref.where("precio", "<=", precio));
    this.restaurantes = this.restaurantesCollectionG.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Restaurante
        data.id = a.payload.doc.id;
        return data;
      })
    }));*/
    this.restaurantesCollection = this.db.collection('restaurante',ref=>ref.where('prom','<=',precio));
    this.restaurantes = this.restaurantesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Restaurante
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.restaurantes;
  }

  //Método que permite agregar platillo a  Restaurante 
  addPlatillo(res: Restaurante, platillo: Platillos) {
    var prom = 0
    var anadirplatillo= this.db.collection('restaurante/' + res.id + '/platillos').add({
      'nombre': platillo.nombre,
      'descripcion': platillo.descripcion,
      'precio': platillo.precio
      
    });

    res.total+=platillo.precio
    res.prom = 0
    res.cantidad++;
    res.prom = res.total/res.cantidad
    this.updateRestaurante(res)
    //console.log(platillo.precio)

  }


//Eliminar platillos
deletePlatillo(res: Restaurante, platillo: Platillos) {
  var prom = 0
  this.db.doc('restaurante/' + res.id + '/platillos/'+platillo.id).delete()
   

  //res.prom-=platillo.precio
  res.total-=platillo.precio
  res.prom = 0
  res.cantidad--;
  res.prom = res.total/res.cantidad
  this.updateRestaurante(res)
  //console.log(platillo.precio)

}


//Obtener todos los platillos
getPlatillos(res: Restaurante){
  this.platillosCollection = this.db.collection(`restaurante/${res.id}/platillos`);
    this.platillos = this.platillosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Platillos
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.platillos
}



}
