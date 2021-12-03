import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { TituloPipe } from './pipes/titulo.pipe';

//Para conectarnos al servidor donde está el json
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    DetalleComponent,
    TituloPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// HttpClientModule importamos modulo