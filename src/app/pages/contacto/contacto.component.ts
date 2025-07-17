import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
/**
 * @description Formulario de contacto con datos de la tienda.
 */
export class ContactoComponent implements OnInit {
  /** @description Formulario para enviar el mensaje */
  contactForm!: FormGroup;
  /** @description Indica si el mensaje fue enviado */
  enviado = false;
  /**
   * @description Inyecta dependencias necesarias para el formulario
   * @param fb FormBuilder para crear los controles
   * @param title Servicio para actualizar el título de la página
   * @param meta Servicio para actualizar metadatos
   */
  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta
  ) {}

    /**
   * @description Inicializa el formulario de contacto
   * @returns void
   */

  ngOnInit(): void {
    this.title.setTitle('Contacto - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Ponte en contacto con el equipo de Piña Costa.'
    });
    
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }
  /**
   * @description Envía el mensaje al destinatario
   * @returns void
   */
  enviarMensaje(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.enviado = true;
    this.contactForm.reset();
  }
  /**
   * @description Limpia el formulario y estado
   * @returns void
   */
  limpiar(): void {
    this.contactForm.reset();
    this.enviado = false;
  }
}
