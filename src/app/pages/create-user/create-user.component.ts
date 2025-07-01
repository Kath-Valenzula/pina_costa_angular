/**
 * @description Formulario para crear un usuario desde Admin.
 */
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  rol: string = '';

  /**
   * @description Router para volver al panel
   * @param router Manejador de rutas
   */
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Crear Usuario - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Formulario para crear usuarios en Piña Costa.'
    });
  }

  /**
   * @description Guarda un nuevo usuario en localStorage
   * @returns void
   */
  crearUsuario(): void {
    if (!this.nombre || !this.email || !this.password || !this.rol) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u: any) => u.id)) + 1 : 1;

    const nuevoUsuario: any = {
      id: nuevoId,
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario creado correctamente.');
    this.router.navigate(['/admin']);
  }
}
