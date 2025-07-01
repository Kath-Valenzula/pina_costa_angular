import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
/** Formulario de contacto con datos de la tienda. */
export class ContactoComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Contacto - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Ponte en contacto con el equipo de Piña Costa.'
    });
  }
}
