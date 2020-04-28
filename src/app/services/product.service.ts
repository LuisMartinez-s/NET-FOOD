import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable} from 'rxjs';
import { Product } from '../models/product';
import { map} from 'rxjs/operators';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   productsCollection:AngularFirestoreCollection<Product>;
   products: Observable<Product[]>; 
   productDoc:AngularFirestoreDocument<Product>;

  constructor(public db:AngularFirestore) { 
    //Obtener valores de la coleccion
    //this.products = this.db.collection('products').valueChanges()

    this.productsCollection = this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        //as Product hace referencia a la interfaz en products.ts
        const data = a.payload.doc.data() as Product
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getProducts(){
    return this.products
  }

  //Agregar producto
  addProduct(product:Product){

    this.productsCollection.add(product);
  }



  //Eliminar producto
  deleteProduct(product:Product){
    //Obtiene el id del producto
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete()
  }

  updateProduct(product:Product){
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }
}
