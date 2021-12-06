import { Injectable } from '@angular/core';

//Importamos libreria
import { HttpClient } from '@angular/common/http';
import { Noticias } from '../interfaces/noticias';
import { NoticiasNetCore } from '../interfaces/noticiasNetCore';
import { Observable } from 'rxjs';
import { Imagen } from '../interfaces/imagen';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  // private api = 'http://localhost:22795/api/';
  //  private api = 'https://apiblogc.herokuapp.com/api/'
   private api = 'https://apiblogcors.azurewebsites.net/api/'
  
  //declaramos variable
  noticias: Noticias[]=[];
  noticiasApi: Noticias[]=[];
  listNoticiasNetCore: NoticiasNetCore[]=[];
  //Declaramos variable en constructor, lo llamamos en el constructor
  constructor(private http:HttpClient) {
    this.cargarNoticias();
    this.cargarNoticiasNetCoreApi();
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

    cargarNoticiasNetCoreApi(){
      return this.http.get(this.api + "NoticiasApi/GetApiNetCore")
      .subscribe((res:any) => {
        this.noticiasApi = res.articles; 
        console.log(res);
      })
    }

    grabarNoticia(noticia: NoticiasNetCore):Observable<any>{
      return this.http.post(this.api + "Noticias", noticia);
    }

    getNoticia(id:string):Observable<any>{
      return this.http.get(`${this.api}Noticias/?id=${id}`);
    }

    updateNoticia(noticia:NoticiasNetCore):Observable<any>{
      return this.http.put(`${this.api}Noticias`, noticia);
    }

    deleteNoticia(id: string):Observable<any>{
      return this.http.delete(`${this.api}Noticias/?id=${id}`);
    }

    iniciarSesion(correo:string, password:string):Observable<any>{
      return this.http.get(`${this.api}Usuario/IniciarSesion=correo=${correo}/password=${password}`);
    }

    uploadFile(noticia:FormData):Observable<any>{
      return this.http.post(`${this.api}Noticias/uploadFile`, noticia);
    }
}

//Comando para crear service ng g service services/noticias
