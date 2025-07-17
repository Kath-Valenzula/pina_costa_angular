import { Component } from '@angular/core';

/**
 * @description Componente que representa el pie de página del sitio Piña Costa.
 * Contiene enlaces a secciones importantes y redes sociales.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /**
   * @description Año actual mostrado en el pie de página.
   */
  currentYear: number = new Date().getFullYear();

  /**
   * @description Constructor del componente Footer.
   * Actualmente no requiere inyección de dependencias.
   */
  constructor() {}

  /**
   * @description Método para redirigir al usuario a una URL externa.
   * @param url URL del enlace a abrir en una nueva pestaña.
   * @returns void
   */
  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}