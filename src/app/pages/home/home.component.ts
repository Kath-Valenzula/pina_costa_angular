import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * @description Página principal con productos destacados.
 */
export class HomeComponent implements OnInit {
    /** @description Productos mostrados en portada */
  productos: Producto[] = [];

  /**
   * @description Servicio para obtener productos
   * @param productSvc Servicio de productos
   */
  constructor(
    private productSvc: ProductService,
    private title: Title,
    private meta: Meta
  ) { }

  /**
   * @description Carga los productos al iniciar
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Inicio - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Explora productos destacados de Piña Costa.'
    });

    this.productSvc.getAll().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }
}
