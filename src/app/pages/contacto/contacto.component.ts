import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
/** Formulario de contacto con datos de la tienda. */
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta
  ) {}

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

  enviarMensaje(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.enviado = true;
    this.contactForm.reset();
  }

  limpiar(): void {
    this.contactForm.reset();
    this.enviado = false;
  }
}
