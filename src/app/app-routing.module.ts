/**
 * @description Define las rutas principales que mapean URLs a componentes.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AcercaComponent } from './pages/acerca/acerca.component';

/**
 * @description Arreglo de rutas utilizado por el enrutador
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'acerca', component: AcercaComponent },
  // Ruta por defecto si no existe coincidencia
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/**
 * @description Módulo que configura el enrutador de la app
 */
export class AppRoutingModule { }
