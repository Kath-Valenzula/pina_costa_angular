import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
/**
 * @description Formulario para solicitar recuperación de cuenta.
 * 
 */
export class RecuperarComponent implements OnInit {
    /** @description Formulario de recuperación */
  recuperarForm!: FormGroup;
    /** @description Indica si el formulario fue enviado */
  enviado = false;
    /** @description Mensaje de error a mostrar */
  error = '';

  /**
   * @description FormBuilder para crear el formulario
   * 
   * @param fb FormBuilder inyectado
   */
  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Inicializa el formulario de recuperación
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Recuperar cuenta - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Formulario para recuperar tu contraseña en Piña Costa.'
    });

    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      direccionDespacho: [''],
      fechaNacimiento:   ['', Validators.required]
    });
  }

  /**
   * @description Envía la solicitud de recuperación
   * 
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
   * 
   * @returns void
   */
  limpiar(): void {
    this.recuperarForm.reset();
    this.error = '';
    this.enviado = false;
  }
}
