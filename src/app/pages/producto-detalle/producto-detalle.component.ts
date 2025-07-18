import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductService } from 'src/app/services/productos.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
/**
 * @description Muestra la información de un producto concreto.
 * 
 */
export class ProductoDetalleComponent implements OnInit {
    /** @description Producto mostrado en la vista */
  producto!: Producto;

  /**
   * @description Inyecta servicios necesarios
   * 
   * @param route Ruta activa para obtener parámetros
   * @param productService Servicio de productos
   * @param cartService Servicio de carrito
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Busca el producto según el id de la URL
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Producto - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Detalles del producto seleccionado en Piña Costa.'
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getById(id).subscribe((prod) => {
        if (prod) {
          this.producto = prod;
        }
      });
    }
  }

  /**
   * @description Añade el producto actual al carrito
   * 
   * @returns void
   */
  agregarAlCarrito(): void {
    if (this.producto) {
      this.cartService.agregar(this.producto);
      alert(`"${this.producto.nombre}" fue agregado al carrito.`);
    }
  }
}
