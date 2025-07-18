// Pruebas de la pantalla de inicio de sesión.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authSpy: jasmine.SpyObj<AuthService>;

  // Configura el entorno de pruebas
  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login', 'getCurrent']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [ { provide: AuthService, useValue: authSpy } ]
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
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    component.iniciarSesion();
    expect(component.error).toBe('Revisa los campos marcados.');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // Admin válido redirige al panel
  it('debe navegar a /admin con credenciales admin@example.com/Admin#123', () => {
    spyOn(router, 'navigate');
    authSpy.login.and.returnValue(true);
    authSpy.getCurrent.and.returnValue({ email: 'admin@example.com', password: 'Admin#123', rol: 'admin' });
    component.loginForm.get('email')?.setValue('admin@example.com');
    component.loginForm.get('password')?.setValue('Admin#123');
    component.iniciarSesion();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  // Usuario normal redirige a su perfil
  it('debe navegar a /perfil con credenciales de usuario normal', () => {
    spyOn(router, 'navigate');
    authSpy.login.and.returnValue(true);
    authSpy.getCurrent.and.returnValue({ email: 'user@example.com', password: 'User#123', rol: 'usuario' });
    component.loginForm.get('email')?.setValue('user@example.com');
    component.loginForm.get('password')?.setValue('User#123');
    component.iniciarSesion();
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });
});
