/**
 * @description Página principal con productos destacados.
 */
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];

  /**
   * @description Servicio para obtener productos
   * @param productSvc Servicio de productos
   */
  constructor(private productSvc: ProductService) { }

  /**
   * @description Carga los productos al iniciar
   * @returns void
   */
  ngOnInit(): void {
    this.productSvc.getAll().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }
}
