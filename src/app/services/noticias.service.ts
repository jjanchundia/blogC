import { Injectable } from '@angular/core';

//Importamos libreria
import { HttpClient } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import { NoticiasNetCore } from '../interfaces/noticiasNetCore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private api = 'https://localhost:44326/api/';
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
      return this.http.get(this.api + 'Noticias/GetAll')
      .subscribe((res:any) => {
        this.listNoticiasNetCore = res; 
        console.log(this.listNoticiasNetCore);
      })
    }

    grabarNoticia(noticia: NoticiasNetCore):Observable<any>{
      return this.http.post(this.api + "Noticias", noticia);
    }

    getComentario(id:string):Observable<any>{
      // https://localhost:44326/api/Noticias?id=05F4F68E-9BB1-4E36-836C-0A9DAEC8736A
      return this.http.get(`${this.api}Noticias/?id=${id}`);
    }

    updateNoticia(noticia:NoticiasNetCore):Observable<any>{
      return this.http.put(`${this.api}Noticias`, noticia);
    }

    deleteNoticia(id: string):Observable<any>{
      return this.http.delete(`${this.api}Noticias/?id=${id}`);
    }
}

//Comando para crear service ng g service services/noticias