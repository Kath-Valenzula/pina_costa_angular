import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * @description Panel para gestionar usuarios y productos.
 * 
 */
export class AdminComponent implements OnInit {
  /** @description Usuario autenticado en el panel */
  usuario!: Usuario;
  /** @description Lista de usuarios registrados */
  usuarios: Usuario[] = [];
  /** @description Listado de productos disponibles */
  productos: Producto[] = [];
  /** @description Formulario reactivo para productos */
  productoForm!: FormGroup;
  
  /**
   * @description Recibe Router para navegar
   * @param router Manejador de rutas
   * 
   */
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private fb: FormBuilder
  ) {}

  /**
   * @description Carga datos iniciales del panel
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Admin - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Panel de administración de Piña Costa.'
    });

    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.productoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      imagen: [''],
      descripcion: [''],
      precio: [null, Validators.required]
    });
    this.cargarUsuarios();
    this.cargarProductos();
  }

  /**
   * @description Obtiene la lista de usuarios almacenados
   * 
   * @returns void
   */
  cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  /**
   * @description Obtiene los productos guardados
   * 
   * @returns void
   */
  cargarProductos(): void {
    const data = localStorage.getItem('productos');
    this.productos = data ? JSON.parse(data) : [];
  }

  /**
   * @description Redirige al formulario de registro
   * 
   * @returns void
   */
  crearUsuario(): void {
    this.router.navigate(['/registro']);
  }

  /**
   * @description Muestra un aviso para editar un usuario
   * 
   * @param usuario Usuario seleccionado
   * @returns void
   */
  editarUsuario(usuario: Usuario): void {
    alert(`Editar usuario: ${usuario.nombre}`);
  }

  /**
   * @description Elimina un usuario tras confirmar
   * 
   * @param usuario Usuario a eliminar
   * @returns void
   */
  eliminarUsuario(usuario: Usuario): void {
    if (confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  /**
   * @description Carga el producto seleccionado en el formulario
   * 
   * @param producto Producto a editar
   * @returns void
   */
  editarProducto(producto: Producto): void {
    this.productoForm.patchValue(producto);
  }

  /**
   * @description Elimina un producto tras confirmar
   * 
   * @param producto Producto a eliminar
   * @returns void
   */
  eliminarProducto(producto: Producto): void {
    if (confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
  }

  /**
   * @description Guarda el producto nuevo o editado
   * 
   * @returns void
   */
  guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const data = this.productoForm.value;

    if (data.id) {
      const idx = this.productos.findIndex(p => p.id === data.id);
      if (idx !== -1) this.productos[idx] = { ...data };
    } else {
      const nuevoId = this.productos.length
        ? Math.max(...this.productos.map(p => p.id)) + 1
        : 1;
      this.productos.push({ ...data, id: nuevoId });
    }

    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.productoForm.reset({ id: null, nombre: '', imagen: '', descripcion: '', precio: null });
  }


  /**
   * @description Quita la sesión y vuelve a login
   * 
   * @returns void
   */
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
