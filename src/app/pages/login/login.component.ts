import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * @description Información de usuarios para el ejemplo de login.
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
 */
export class LoginComponent implements OnInit {
    /** @description Formulario de inicio de sesión */
  loginForm!: FormGroup;
    /** @description Mensaje de error al validar */
  error = '';

  /**
   * @description Constructor con inyección de dependencias
   * @param fb FormBuilder para crear el formulario
   * @param router Controlador de rutas
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Inicializa usuarios de ejemplo y el formulario
   * @returns void
   */
  ngOnInit(): void {

    this.title.setTitle('Iniciar sesión - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Accede a tu cuenta de Piña Costa.'
    });

    const seedAdmin: Usuario = { nombre: 'Admin', email: 'admin@example.com', password: 'admin123', rol: 'admin' };
    const seedUser:  Usuario = { nombre: 'Usuario', email: 'usuario', password: 'usuario', rol: 'usuario' };
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (!usuarios.find(u => u.email === seedAdmin.email)) usuarios.unshift(seedAdmin);
    if (!usuarios.find(u => u.email === seedUser.email))  usuarios.push(seedUser);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * @description Valida credenciales y navega según el rol
   * @returns void
   */
  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.error = 'Revisa los campos marcados.';
      return;
    }
    const { email, password } = this.loginForm.value;
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
      this.error = 'Correo o contraseña incorrectos';
      return;
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate([ usuario.rol === 'admin' ? '/admin' : '/perfil' ]);
  }

  /**
   * @description Limpia el formulario y errores
   * @returns void
   */
  limpiar(): void {
    this.loginForm.reset();
    this.error = '';
  }

  /**
   * @description Redirige a recuperación de contraseña
   * @returns void
   */
  recuperarPassword(): void {
    this.router.navigate(['/recuperar']);
  }

  /**
   * @description Redirige a la página de registro
   * @returns void
   */
  registrarse(): void {
    this.router.navigate(['/registro']);
  }
}
