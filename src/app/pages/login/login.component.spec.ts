// Pruebas de la pantalla de inicio de sesión.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  // Configura el entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    }).compileComponents();
  });

  // Instancia el componente en cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    localStorage.clear();
  });

  // Formulario vacío debe mostrar error y no navegar
  it('no debe iniciar sesión si el formulario es inválido', () => {
    spyOn(router, 'navigate');
    component.loginForm.get('email')!.setValue('');
    component.loginForm.get('password')!.setValue('');
    component.iniciarSesion();
    expect(component.error).toBe('Revisa los campos marcados.');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // Admin válido redirige al panel
  it('debe navegar a /admin con credenciales admin@example.com/admin123', () => {
    spyOn(router, 'navigate');
    localStorage.setItem('usuarios', JSON.stringify([
      { nombre: 'Admin', email: 'admin@example.com', password: 'admin123' }
    ]));
    component.loginForm.get('email')!.setValue('admin@example.com');
    component.loginForm.get('password')!.setValue('admin123');
    component.iniciarSesion();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  // Usuario normal redirige a su perfil
  it('debe navegar a /perfil con credenciales de usuario normal', () => {
    spyOn(router, 'navigate');
    localStorage.setItem('usuarios', JSON.stringify([
      { nombre: 'User', email: 'user@example.com', password: 'userpwd' }
    ]));
    component.loginForm.get('email')!.setValue('user@example.com');
    component.loginForm.get('password')!.setValue('userpwd');
    component.iniciarSesion();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });
});
