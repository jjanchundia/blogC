import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginusuario: FormGroup;

  constructor(public ns:NoticiasService, private fb: FormBuilder,
    private _noticiaServices:NoticiasService, 
    private router:Router, private aRoute: ActivatedRoute) {
      this.loginusuario = this.fb.group({
        correo:['', Validators.required],
        password:['', Validators.required],
      });
    }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const users: Usuario = {
      correo:this.loginusuario.get('correo')?.value,
      password:this.loginusuario.get('password')?.value,
    }

    if (users.correo === '' || users.password === '') {
        return alert("Llenar todos los campos");
      }
      
    this.ns.iniciarSesion(users.correo, users.password)
    .subscribe(data=>{
      console.log(data);
      window.location.href='/administrador';      
    }, error=>{
      console.log(error);      
    });    
  }
}
