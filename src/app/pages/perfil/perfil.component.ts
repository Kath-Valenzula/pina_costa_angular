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

  constructor(private fb: FormBuilder, private router: Router) {}

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

  editar(): void {
    this.editando = true;
  }

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

  cancelar(): void {
    this.editando = false;
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  limpiar(): void {
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      direccionDespacho: this.usuario.direccionDespacho,
      fechaNacimiento: this.usuario.fechaNacimiento,
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
