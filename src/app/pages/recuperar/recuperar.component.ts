// Formulario para solicitar recuperación de cuenta.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  recuperarForm!: FormGroup;
  enviado = false;
  error = '';

  // FormBuilder para crear el formulario
  constructor(private fb: FormBuilder) {}

  // Inicializa el formulario de recuperación
  ngOnInit(): void {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      direccionDespacho: [''],
      fechaNacimiento:   ['', Validators.required]
    });
  }

  // Envía la solicitud de recuperación
  onSubmit(): void {
    if (this.recuperarForm.invalid) {
      this.error = 'Revisa los campos marcados.';
      this.enviado = false;
      return;
    }
    this.enviado = true;
    this.error = '';
    this.recuperarForm.reset();
  }

  // Reinicia el formulario
  limpiar(): void {
    this.recuperarForm.reset();
    this.error = '';
    this.enviado = false;
  }
}
