import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AgregareditarComponent } from './pages/agregareditar/agregareditar.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { LoginComponent } from './pages/login/login.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

// esto es para nuestras rutas,
//path: , componente
//Para redireccionar a pagina principal, rutas
// { path:'**', pathMatch: 'full', redirectTo:'noticias' }
const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent },
  {path: 'detalle', component: DetalleComponent },
  {path: 'login', component: LoginComponent },
  {path: 'administrador', component: AdminComponent },
  {path: 'agregar', component: AgregareditarComponent },
  {path: 'editarNoticia/:id', component: AgregareditarComponent },
  {path: 'ver/:id', component: AgregareditarComponent },
  { path:'**', pathMatch: 'full', redirectTo:'noticias' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
