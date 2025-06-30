// Vista para mostrar y editar datos del usuario.
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

  // Obtiene formularios y router por inyección
  constructor(private fb: FormBuilder, private router: Router) {}

  // Carga el usuario guardado y crea el formulario
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

  // Pone el formulario en modo edición
  editar(): void {
    this.editando = true;
  }

  // Guarda los cambios en localStorage
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

  // Restaura los valores sin guardar
  cancelar(): void {
    this.editando = false;
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  // Limpia el formulario dejando datos actuales
  limpiar(): void {
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  // Elimina la sesión actual
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
