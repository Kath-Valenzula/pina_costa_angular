/**
 * @description Página con información de la tienda.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  /**
   * @description Inyección de dependencias si fuera necesario
   */
  constructor() { }

  /**
   * @description Aquí podría cargarse información adicional
   * @returns void
   */
  ngOnInit(): void { }
}
