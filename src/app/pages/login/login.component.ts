import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ns:NoticiasService) {}

  ngOnInit(): void {
  }

  eliminarNoticia(id: any){
    debugger
    this.ns.deleteNoticia(id).subscribe(()=>{
      // this.router.navigate(['/login']);
      window.location.href='/login';
    }, error=>{
      console.log(error);      
    });
  }
}
