 import { Component, OnInit } from '@angular/core';
 import { Title, Meta } from '@angular/platform-browser';
 import { EncargosService } from '../../services/encargos.service';
 import { Encargo } from '../../models/encargo.model';
 
 @Component({
   selector: 'app-encargos',
   templateUrl: './encargos.component.html',
   styleUrls: ['./encargos.component.css']
 })
 /** Lista de encargos personalizados. */
 export class EncargosComponent implements OnInit {
   encargos: Encargo[] = [];
 
   constructor(
     private encargosSvc: EncargosService,
     private title: Title,
     private meta: Meta
   ) {}
 
   ngOnInit(): void {
     this.title.setTitle('Encargos - Piña Costa');
     this.meta.updateTag({ name: 'description', content: 'Solicita encargos personalizados en Piña Costa.' });
 
     this.encargosSvc.getAll().subscribe(data => {
       this.encargos = data;
     });
   }
 }
