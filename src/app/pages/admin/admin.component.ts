// Panel para gestionar usuarios y productos.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario: any;
  usuarios: any[] = [];
  productos: any[] = [];
  nuevoProducto: any = {
    id: null,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: null
  };

  // Recibe Router para navegar
  constructor(private router: Router) {}

  // Carga datos iniciales del panel
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.cargarUsuarios();
    this.cargarProductos();
  }

  // Obtiene la lista de usuarios almacenados
  cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  // Obtiene los productos guardados
  cargarProductos(): void {
    const data = localStorage.getItem('productos');
    this.productos = data ? JSON.parse(data) : [];
  }

  // Redirige al formulario de registro
  crearUsuario(): void {
    this.router.navigate(['/registro']);
  }

  // Muestra un aviso para editar un usuario
  editarUsuario(usuario: any): void {
    alert(`Editar usuario: ${usuario.nombre}`);
  }

  // Elimina un usuario tras confirmar
  eliminarUsuario(usuario: any): void {
    if (confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  // Carga el producto seleccionado en el formulario
  editarProducto(producto: any): void {
    this.nuevoProducto = { ...producto };
  }

  // Elimina un producto tras confirmar
  eliminarProducto(producto: any): void {
    if (confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
  }

  // Guarda el producto nuevo o editado
  guardarProducto(): void {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.nuevoProducto.id) {
      const idx = this.productos.findIndex(p => p.id === this.nuevoProducto.id);
      if (idx !== -1) this.productos[idx] = { ...this.nuevoProducto };
    } else {
      const nuevoId = this.productos.length
        ? Math.max(...this.productos.map(p => p.id)) + 1
        : 1;
      this.productos.push({ ...this.nuevoProducto, id: nuevoId });
    }

    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.nuevoProducto = {
      id: null,
      nombre: '',
      imagen: '',
      descripcion: '',
      precio: null
    };
  }


  // Quita la sesión y vuelve a login
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
