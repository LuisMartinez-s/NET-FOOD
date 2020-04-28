import { Component, OnInit } from '@angular/core';
import{ ProductService}  from '../../services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //Arreglo para guardar productos y llamarlo en el html
  products=[];
  //Editar el producto
  editingProduct:Product;
  //Verifica si presionó edit
  editing = false;

  constructor(public productService:ProductService) {

   }

  ngOnInit(): void {

    //AQUI SE MUESTRA LO QUE HAY EN LA COLECCIÓN
    this.productService.getProducts().subscribe(products =>{
      console.log(products)
      this.products = products;
    })
  }

  deleteProducts(event,product){
    if(confirm("Are you sure you want delete it?")){
    this.productService.deleteProduct(product);
   }
  }

  editProduct(event,product){
    this.editingProduct = product;
    this.editing = !this.editing;

  }

  updateProduct(){
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }

}
