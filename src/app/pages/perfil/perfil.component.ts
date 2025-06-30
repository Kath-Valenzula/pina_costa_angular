/**
 * @description Vista para mostrar y editar datos del usuario.
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  nombre: string;
  email: string;
  direccionDespacho?: string;
  fechaNacimiento?: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  usuario!: Usuario;
  editando = false;

  /**
   * @description Obtiene formularios y router por inyección
   * @param fb FormBuilder para construir el formulario
   * @param router Navegación entre rutas
   */
  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * @description Carga el usuario guardado y crea el formulario
   * @returns void
   */
  ngOnInit(): void {
    this.usuario = JSON.parse(
      localStorage.getItem('usuario') || '{}'
    );

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [
        this.usuario.email,
        [Validators.required, Validators.email],
      ],
      direccionDespacho: [this.usuario.direccionDespacho],
      fechaNacimiento: [
        this.usuario.fechaNacimiento,
        Validators.required,
      ],
    });
  }

  /**
   * @description Pone el formulario en modo edición
   * @returns void
   */
  editar(): void {
    this.editando = true;
  }

  /**
   * @description Guarda los cambios en localStorage
   * @returns void
   */
  guardarCambios(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }
    this.usuario = {
      ...this.usuario,
      ...this.perfilForm.value,
    };
    localStorage.setItem(
      'usuario',
      JSON.stringify(this.usuario)
    );
    this.editando = false;
  }

  /**
   * @description Restaura los valores sin guardar
   * @returns void
   */
  cancelar(): void {
    this.editando = false;
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  /**
   * @description Limpia el formulario dejando datos actuales
   * @returns void
   */
  limpiar(): void {
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  /**
   * @description Elimina la sesión actual
   * @returns void
   */
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
