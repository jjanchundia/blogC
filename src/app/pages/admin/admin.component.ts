import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public ns:NoticiasService) {}

  ngOnInit(): void {
  }

  eliminarNoticia(id: any){
    this.ns.deleteNoticia(id).subscribe(()=>{
      // this.router.navigate(['/login']);
      window.location.href='/administrador';
    }, error=>{
      console.log(error);      
    });
  }
}