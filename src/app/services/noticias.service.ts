import { Injectable } from '@angular/core';

//Importamos libreria
import { HttpClient } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import { NoticiasNetCore } from '../interfaces/noticiasNetCore';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  //declaramos variable
  // noticias: any[] = [];
  noticias: Noticias[]=[];
  listNoticiasNetCore: NoticiasNetCore[]=[];
  //Declaramos variable en constructor, lo llamamos en el constructor
  constructor(private http:HttpClient) {
    this.cargarNoticias();
    this.cargarNoticiasNetCore();
   }

  //Metodo que carga la información de nuestra api
  // https://gnews.io/api/v4/search?q=reloj&token=0a3b039204dab7cc14e30831ba2c9537
  cargarNoticias(){
    return this.http.get('https://gnews.io/api/v4/search?q=watch&token=0a3b039204dab7cc14e30831ba2c9537')
    .subscribe((res:any) => {
      this.noticias = res.articles; 
      console.log(this.noticias);
    })
  }

    //Metodo que carga la información de nuestra api
    cargarNoticiasNetCore(){
      return this.http.get('https://localhost:44326/api/Noticias/GetAll')
      .subscribe((res:any) => {
        this.listNoticiasNetCore = res; 
        console.log(this.listNoticiasNetCore);
      })
    }
}

//Comando para crear service ng g service services/noticias