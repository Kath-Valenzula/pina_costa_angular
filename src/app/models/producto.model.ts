// Interfaz con las propiedades de un producto.
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  // Campo opcional con más detalles
  descripcion?: string;
}
