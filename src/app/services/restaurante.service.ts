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
 

  getRestaurantes() {
    return this.restaurantes
  }

  //Agregar Restaurante
  addRestaurante(restaurante: Restaurante) {
    this.restaurantesCollection.add({
      'name': restaurante.name,
      'lat': restaurante.lat,
      'lng': restaurante.lng,
      'prom':0,
      'cantidad':0
    });

    
  }

  //Promedio de precio
  
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
 



  //Eliminar Restaurante
  deleteRestaurante(restaurante: Restaurante) {
    //Obtiene el id del Restaurante
    this.restauranteDoc = this.db.doc(`restaurante/${restaurante.id}`);
    this.restauranteDoc.delete()
  }

  updateRestaurante(restaurante: Restaurante) {
    this.restauranteDoc = this.db.doc(`restaurante/${restaurante.id}`);
    this.restauranteDoc.update(restaurante);
  }


  //Consulta Restaurante
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
  



  }

  
  

  addPlatillo(res: Restaurante, platillo: Platillos) {
    var prom = 0
    var anadirplatillo= this.db.collection('restaurante/' + res.id + '/platillos').add({
      'nombre': platillo.nombre,
      'descripcion': platillo.descripcion,
      'precio': platillo.precio
      
    });
    res.prom+=platillo.precio
    res.cantidad++;
    res.prom = res.prom/res.cantidad
    this.updateRestaurante(res)
    
    

    
    
    
    

    //console.log(platillo.precio)

  }


}