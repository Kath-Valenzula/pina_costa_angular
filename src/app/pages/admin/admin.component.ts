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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.cargarUsuarios();
    this.cargarProductos();
  }

  cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  cargarProductos(): void {
    const data = localStorage.getItem('productos');
    this.productos = data ? JSON.parse(data) : [];
  }

  crearUsuario(): void {
    this.router.navigate(['/registro']);
  }

  editarUsuario(usuario: any): void {
    alert(`Editar usuario: ${usuario.nombre}`);
  }

  eliminarUsuario(usuario: any): void {
    if (confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  editarProducto(producto: any): void {
    this.nuevoProducto = { ...producto };
  }

  eliminarProducto(producto: any): void {
    if (confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
  }

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


  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
