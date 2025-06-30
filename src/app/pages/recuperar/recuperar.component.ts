/**
 * @description Formulario para solicitar recuperación de cuenta.
 */
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

  /**
   * @description FormBuilder para crear el formulario
   * @param fb FormBuilder inyectado
   */
  constructor(private fb: FormBuilder) {}

  /**
   * @description Inicializa el formulario de recuperación
   * @returns void
   */
  ngOnInit(): void {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      direccionDespacho: [''],
      fechaNacimiento:   ['', Validators.required]
    });
  }

  /**
   * @description Envía la solicitud de recuperación
   * @returns void
   */
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

  /**
   * @description Reinicia el formulario
   * @returns void
   */
  limpiar(): void {
    this.recuperarForm.reset();
    this.error = '';
    this.enviado = false;
  }
}
