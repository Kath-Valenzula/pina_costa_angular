import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JsonService } from '../../services/json.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
/** Muestra y administra la lista de productos obtenida desde GitHub Pages. */
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevo: Producto = { id: 0, nombre: '', precio: 0, imagen: '', descripcion: '' };
  editando?: Producto;

  constructor(private jsonSvc: JsonService) {}

  /** Carga los productos al iniciar el componente. */
  ngOnInit(): void {
    this.cargarProductos();
  }

  /** Solicita los productos al servicio. */
  cargarProductos(): void {
    this.jsonSvc.getProductos().subscribe(data => (this.productos = data));
  }

  /** Envía un nuevo producto. */
  agregar(form: NgForm): void {
    if (form.invalid) return;
    this.jsonSvc.addProducto(this.nuevo).subscribe(() => {
      this.cargarProductos();
      form.resetForm();
    });
  }

  /** Prepara un producto para edición. */
  editar(producto: Producto): void {
    this.editando = { ...producto };
  }

  /** Guarda los cambios realizados. */
  actualizar(form: NgForm): void {
    if (!this.editando) return;
    this.jsonSvc.updateProducto(this.editando).subscribe(() => {
      this.cargarProductos();
      this.cancelar();
    });
  }

  /** Elimina un producto por su id. */
  eliminar(id: number): void {
    this.jsonSvc.deleteProducto(id).subscribe(() => this.cargarProductos());
  }

  /** Sale del modo edición. */
  cancelar(): void {
    this.editando = undefined;
  }
}
