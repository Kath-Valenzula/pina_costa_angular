// Pruebas del componente Header.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Configura el módulo de pruebas con un carrito simulado
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: CartService,
          useValue: { obtenerCarritoObservable: () => of([]) }
        }
      ]
    }).compileComponents();
  });

  // Crea el componente para cada test
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
