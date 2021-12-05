import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagen } from 'src/app/interfaces/imagen';
import { NoticiasNetCore } from 'src/app/interfaces/noticiasNetCore';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-agregareditar',
  templateUrl: './agregareditar.component.html',
  styleUrls: ['./agregareditar.component.css']
})
export class AgregareditarComponent implements OnInit {

  img='0';
  agregarnoticia: FormGroup;
  accion = 'Agregar';
  id='';
  varNoticias: NoticiasNetCore | undefined;
  formData = new FormData();
  // public ns:NoticiasService,
  constructor(private fb: FormBuilder, 
    private _noticiaServices:NoticiasService, 
    private aRoute: ActivatedRoute) {
    this.agregarnoticia = this.fb.group({
      titulo:['', Validators.required],
      description:['', Validators.required],
      imagen:['0', Validators.required],
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
      this._noticiaServices.getNoticia(this.id).subscribe(data=>{
        console.log(data);
        
        this.agregarnoticia.patchValue({
          titulo:data.titulo,
          description:data.description,
          imagen:data.imagen !== '' ? '0' :'1',
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

  public capturaData(event:any){

    const imagen: Imagen = {
      imagen2:event.target.files[0],
      folderName:"Contenedor",
      imageName:event.target.files[0].name,
    }
    
    if (imagen.folderName!=='') {
      this.img = '1';
    }

    this.formData = new FormData();
    this.formData.append("imagen2", imagen.imagen2);
    this.formData.append("folderName", imagen.folderName);
    this.formData.append("imageName", imagen.imageName);
  
    // this._noticiaServices.uploadFile(formData).subscribe(()=>{
    //   // this.router.navigate(['/login']);
    //   window.location.href='/administrador';
    // }, error=>{
    // });
  } 

  uploadFile(res:any){

  console.log(this.formData);

    if (this.img === '0') {
      return alert("Seleccione Imagen");
    }

     this._noticiaServices.uploadFile(this.formData).subscribe((response:any)=>{
        res.imagen = response[0];
        // console.log(res.image);        
        this.actualizarNoticia(res);
      }, error=>{
        console.log(error);      
      });
  }

  actualizarNoticia(noticia:any){
    this._noticiaServices.updateNoticia(noticia).subscribe(()=>{
      // this.router.navigate(['/login']);
      window.location.href='/administrador';
    }, error=>{
      console.log(error);      
    });
  }
  
  agregarEditarNoticia(){
    
    if (this.id === '') {
      const noticia: NoticiasNetCore = {
        titulo:this.agregarnoticia.get('titulo')?.value,
        description:this.agregarnoticia.get('description')?.value,
        content:this.agregarnoticia.get('content')?.value,
        imagen:this.img,//this.agregarnoticia.get('imagen')?.value,
        url:this.agregarnoticia.get('url')?.value,
        fechaCreacion:new Date,
        fechaModificacion:new Date,
      }
      
      if (this.img === '0') {
        return alert("Seleccione Imagen");
      }

      if (noticia.titulo === '' ||noticia.description === '' ||noticia.content === '' ||
      noticia.imagen === '' ||noticia.url === '') {
        return alert("Llenar todos los campos");
      }
      
      this._noticiaServices.grabarNoticia(noticia).subscribe((res:any)=>{
        // this.router.navigate(['/login']);
        this.varNoticias = res;
        this.uploadFile(res);
        // window.location.href='/administrador';
      }, error=>{
        console.log(error);      
      });
    
  }else{
    const noticia: NoticiasNetCore = {
      id:this.id,
      titulo:this.agregarnoticia.get('titulo')?.value,
      description:this.agregarnoticia.get('description')?.value,
      content:this.agregarnoticia.get('content')?.value,
      imagen:this.img,//this.agregarnoticia.get('imagen')?.value,
      url:this.agregarnoticia.get('url')?.value,
      fechaCreacion:new Date,
      fechaModificacion:new Date,
    }
      if (noticia.titulo === '' ||noticia.description === '' ||noticia.content === '' ||
      noticia.imagen === '' ||noticia.url === '') {
        return alert("Llenar todos los campos");
      }
      
      this.uploadFile(noticia);
      // this.actualizarNoticia(noticia);
      
    }    
  } 
}