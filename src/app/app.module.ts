import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';

import { AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment'
import { AngularFirestoreModule} from '@angular/fire/firestore'
import {GoogleMapsModule} from '@angular/google-maps';
import {HeroLoaderModule} from '@herodevs/hero-loader';
import { RestauranteFormComponent } from './components/restaurante-form/restaurante-form.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductsComponent,
    RestauranteFormComponent,
    RestauranteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    GoogleMapsModule,
    HeroLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
