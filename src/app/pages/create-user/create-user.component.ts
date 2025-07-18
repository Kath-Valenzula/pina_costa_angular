import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description Información de usuario creada desde el panel.
 * 
 * @property id Identificador del usuario
 * @property nombre Nombre del usuario
 * @property email Correo electrónico
 * @property password Contraseña
 * @property rol Rol asignado
 */
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
/**
 * @description Formulario para crear un usuario desde Admin.
 * 
 */
export class CreateUserComponent implements OnInit {
    /** @description Formulario reactivo de creación */
  form!: FormGroup;
    /** @description Mensaje de error mostrado al crear */
  error = '';

  /**
   * @description Router para volver al panel
   * 
   * @param router Manejador de rutas
   */
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private fb: FormBuilder
  ) {}
  /**
   * @description Inicializa el formulario de creación
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Crear Usuario - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Formulario para crear usuarios en Piña Costa.'
    });

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      ]],
      rol: ['', Validators.required]
    });
  }

  /**
   * @description Guarda un nuevo usuario en localStorage
   * 
   * @returns void
   */
  crearUsuario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisa los campos obligatorios.';
      return;
    }

    const { nombre, email, password, rol } = this.form.value;

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    const nuevoUsuario: Usuario = {
      id: nuevoId,
      nombre,
      email,
      password,
      rol
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario creado correctamente.');
    this.form.reset();
    this.error = '';
    this.router.navigate(['/admin']);
  }
}
