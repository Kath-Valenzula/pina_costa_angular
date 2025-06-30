// Componente para autenticar usuarios.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  nombre: string;
  email: string;
  password: string;
  direccionDespacho?: string;
  fechaNacimiento?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  // Inicializa usuarios de ejemplo y el formulario
  ngOnInit(): void {

    const seedAdmin: Usuario = { nombre: 'Admin', email: 'admin@example.com', password: 'admin123' };
    const seedUser:  Usuario = { nombre: 'Usuario', email: 'usuario', password: 'usuario' };
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (!usuarios.find(u => u.email === seedAdmin.email)) usuarios.unshift(seedAdmin);
    if (!usuarios.find(u => u.email === seedUser.email))  usuarios.push(seedUser);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Valida credenciales y navega según el rol
  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.error = 'Revisa los campos marcados.';
      return;
    }
    const { email, password } = this.loginForm.value;
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios')!);
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
      this.error = 'Correo o contraseña incorrectos';
      return;
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate([ usuario.email === 'admin@example.com' ? '/admin' : '/perfil' ]);
  }

  // Limpia el formulario y errores
  limpiar(): void {
    this.loginForm.reset();
    this.error = '';
  }

  // Redirige a recuperación de contraseña
  recuperarPassword(): void {
    this.router.navigate(['/recuperar']);
  }

  // Redirige a la página de registro
  registrarse(): void {
    this.router.navigate(['/registro']);
  }
}
