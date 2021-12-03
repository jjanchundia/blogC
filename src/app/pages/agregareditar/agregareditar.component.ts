import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasNetCore } from 'src/app/interfaces/noticiasNetCore';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-agregareditar',
  templateUrl: './agregareditar.component.html',
  styleUrls: ['./agregareditar.component.css']
})
export class AgregareditarComponent implements OnInit {

  agregarnoticia: FormGroup;
  accion = 'Agregar';
  id='';
  varNoticias: NoticiasNetCore | undefined;

  // public ns:NoticiasService,
  constructor(private fb: FormBuilder, 
    private _noticiaServices:NoticiasService, 
    private router:Router, private aRoute: ActivatedRoute) {
    this.agregarnoticia = this.fb.group({
      titulo:['', Validators.required],
      description:['', Validators.required],
      image:['', Validators.required],
      content:['', Validators.required],
      url:['', Validators.required],
    });
    //Accedemos a prop id
    this.id = this.aRoute.snapshot.paramMap.get('id')!??'';  
    console.log(this.id);
    
   }

   esEditar(){
    if (this.id !== '') {
      this.accion = 'Editar';
      this._noticiaServices.getComentario(this.id).subscribe(data=>{
        this.agregarnoticia.patchValue({
          titulo:data.titulo,
          description:data.description,
          image:data.description,
          content:data.content,
          url:data.url,
        })
      }, error=>{
        console.log(error);        
      })
    }
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarNoticia(){
    var s=this.varNoticias;
    if (this.id === '') {
      const noticia: NoticiasNetCore = {
        titulo:this.agregarnoticia.get('titulo')?.value,
        description:this.agregarnoticia.get('description')?.value,
        content:this.agregarnoticia.get('content')?.value,
        image:this.agregarnoticia.get('image')?.value,
        url:this.agregarnoticia.get('url')?.value,
        fechaCreacion:new Date,
        fechaModificacion:new Date,
      }
      if (noticia.titulo === '' ||noticia.description === '' ||noticia.content === '' ||
      noticia.image === '' ||noticia.url === '') {
        return alert("Llenar todos los campos");
      }

      this._noticiaServices.grabarNoticia(noticia).subscribe(()=>{
        // this.router.navigate(['/login']);
        window.location.href='/login';
      }, error=>{
        console.log(error);      
      });
    
  }else{
    const noticia: NoticiasNetCore = {
      id:this.id,
      titulo:this.agregarnoticia.get('titulo')?.value,
      description:this.agregarnoticia.get('description')?.value,
      content:this.agregarnoticia.get('content')?.value,
      image:this.agregarnoticia.get('image')?.value,
      url:this.agregarnoticia.get('url')?.value,
      fechaCreacion:new Date,
      fechaModificacion:new Date,
    }
      if (noticia.titulo === '' ||noticia.description === '' ||noticia.content === '' ||
      noticia.image === '' ||noticia.url === '') {
        return alert("Llenar todos los campos");
      }
      this._noticiaServices.updateNoticia(noticia).subscribe(()=>{
        // this.router.navigate(['/login']);
        window.location.href='/login';
      }, error=>{
        console.log(error);      
      });
    }    
  } 
}