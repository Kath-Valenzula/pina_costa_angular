 import { Component, OnInit } from '@angular/core';
 import { Title, Meta } from '@angular/platform-browser';
 import { EncargosService } from '../../services/encargos.service';
 import { Encargo } from '../../models/encargo.model';
 
 @Component({
   selector: 'app-encargos',
   templateUrl: './encargos.component.html',
   styleUrls: ['./encargos.component.css']
 })
  /**
  * @description Lista de encargos personalizados.
  */
export class EncargosComponent implements OnInit {
    /** @description Encargos obtenidos del servicio */
  encargos: Encargo[] = [];
  /**
   * @description Inyecta servicios para manejar encargos
   * @param encargosSvc Servicio de encargos
   * @param title Servicio para modificar el título
   * @param meta Servicio para modificar metadatos
   */
  constructor(
    private encargosSvc: EncargosService,
    private title: Title,
    private meta: Meta
  ) {}
    /**
    * @description Carga la lista de encargos desde el servicio
    * @returns void
    */
   ngOnInit(): void {
     this.title.setTitle('Encargos - Piña Costa');
     this.meta.updateTag({ name: 'description', content: 'Solicita encargos personalizados en Piña Costa.' });
 
     this.encargosSvc.getAll().subscribe(data => {
       this.encargos = data;
     });
   }
 }
