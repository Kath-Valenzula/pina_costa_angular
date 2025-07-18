import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * @description Información de usuarios para el ejemplo de login.
 * 
 * @property nombre Nombre del usuario
 * @property email Correo electrónico
 * @property password Contraseña
 * @property rol Rol del usuario
 * @property direccionDespacho Dirección de despacho
 * @property fechaNacimiento Fecha de nacimiento
 */
interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  direccionDespacho?: string;
  fechaNacimiento?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * @description Componente para autenticar usuarios.
 * 
 */
export class LoginComponent implements OnInit {
    /** @description Formulario de inicio de sesión */
  loginForm!: FormGroup;
    /** @description Mensaje de error al validar */
  error = '';

  /**
   * @description Constructor con inyección de dependencias
   * 
   * @param fb FormBuilder para crear el formulario
   * @param router Controlador de rutas
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private auth: AuthService
  ) {}

  /**
   * @description Inicializa usuarios de ejemplo y el formulario
   * 
   * @returns void
   */
  ngOnInit(): void {

    this.title.setTitle('Iniciar sesión - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Accede a tu cuenta de Piña Costa.'
    });


    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      ]]
    });
  }

  /**
   * @description Valida credenciales y navega según el rol
   * 
   * @returns void
   */
  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.error = 'Revisa los campos marcados.';
      return;
    }
    const { email, password } = this.loginForm.value;
    const ok = this.auth.login(email, password);
    if (!ok) {
      this.error = 'Correo o contraseña incorrectos';
      return;
    }
    const usuario = this.auth.getCurrent();
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate([usuario.rol === 'admin' ? '/admin' : '/perfil']);
    }
  }

  /**
   * @description Limpia el formulario y errores
   * 
   * @returns void
   */
  limpiar(): void {
    this.loginForm.reset();
    this.error = '';
  }

  /**
   * @description Redirige a recuperación de contraseña
   * 
   * @returns void
   */
  recuperarPassword(): void {
    this.router.navigate(['/recuperar']);
  }

  /**
   * @description Redirige a la página de registro
   * 
   * @returns void
   */
  registrarse(): void {
    this.router.navigate(['/registro']);
  }
}
