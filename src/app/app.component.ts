import { Component } from '@angular/core';
/**
 * @description Componente raíz mostrado al iniciar la aplicación.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * @description Título mostrado en la plantilla
   */
  title = 'pinna-costa';
}
