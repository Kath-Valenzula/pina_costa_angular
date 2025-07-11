/**
 * @description Módulo principal que reúne componentes y servicios.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AcercaComponent } from './pages/acerca/acerca.component';

@NgModule({
  // Componentes de la aplicación
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoDetalleComponent,
    CartComponent,
    RecuperarComponent,
    PerfilComponent,
    ContactoComponent,
    CreateUserComponent,
    AcercaComponent
  ],
  // Módulos que se utilizan
  imports: [
    BrowserModule,
    CommonModule,            
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * @description Módulo raíz de Angular
 */
export class AppModule { }