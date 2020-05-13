import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante';
import { Platillos } from 'src/app/models/platillos';
import { map } from 'rxjs/operators';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  restaurantesCollection: AngularFirestoreCollection<Restaurante>;
  restaurantes: Observable<Restaurante[]>;
  restauranteDoc: AngularFirestoreDocument<Restaurante>;

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
    this.restaurantesCollection.add(restaurante);
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
  consultaRestaurante(nombre: string) {

    this.restaurantesCollection = this.db.collection('restaurante', ref => ref.where('name', '==', nombre));
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
    var anadirplatillo= this.db.collection('restaurante/' + res.id + '/ platillos').add({
      'nombre': platillo.nombre,
      'descripcion': platillo.descripcion,
      'precio': platillo.precio
    });

  }

  consultaPorPrecio(precio: number) {

    this.restaurantesCollection = this.db.collection('restaurante', ref => ref.where('platillo.precio', '==', precio));
    this.restaurantes = this.restaurantesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Restaurante
        data.id = a.payload.doc.id;
        return data;
      })
    }));

  }

}
