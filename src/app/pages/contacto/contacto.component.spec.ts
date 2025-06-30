// Pruebas del componente de Contacto.
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComponent } from './contacto.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  // Configura el componente para las pruebas
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoComponent]
    });
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
