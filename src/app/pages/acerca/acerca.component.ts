import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
/**
 * @description Página con información de la tienda.
 * 
 */
export class AcercaComponent implements OnInit {
  /**
   * @description Inyección de dependencias si fuera necesario
   * 
   */
  constructor(private title: Title, private meta: Meta) { }

  /**
   * @description Aquí podría cargarse información adicional
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Acerca de - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Conoce más sobre la tienda Piña Costa.'
    });
  }
}
