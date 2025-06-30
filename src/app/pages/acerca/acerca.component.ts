// Página con información de la tienda.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  // Inyección de dependencias si fuera necesario
  constructor() { }

  // Aquí podría cargarse información adicional
  ngOnInit(): void { }
}
