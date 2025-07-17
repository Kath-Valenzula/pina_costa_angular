import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * @description Datos registrados de un usuario.
 * @property nombre Nombre del usuario
 * @property email Correo electrónico
 * @property password Contraseña
 * @property rol Rol del usuario
 * @property confirmPassword Confirmación de la contraseña
 * @property direccionDespacho Dirección de despacho
 * @property fechaNacimiento Fecha de nacimiento
 */
interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  confirmPassword?: string;
  direccionDespacho?: string;
  fechaNacimiento?: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
/**
 * @description Pantalla para registrar nuevos usuarios.
 */
export class RegistroComponent implements OnInit {
    /** @description Formulario reactivo de registro */
  registroForm!: FormGroup;
    /** @description Mensaje de error mostrado al usuario */
  error = '';
    /** @description Mensaje informativo tras el registro */
  mensaje = '';

  /**
   * @description FormBuilder para crear controles
   * @param fb Servicio FormBuilder
   */
  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta
  ) {}

  /**
   * @description Inicializa el formulario de registro
   * @returns void
   */
  ngOnInit(): void {
    this.title.setTitle('Registro - Piña Costa');
    this.meta.updateTag({
      name: 'description',
      content: 'Crea una nueva cuenta en Piña Costa.'
    });

    this.registroForm = this.fb.group({
      nombre:            ['', Validators.required],
      email:             ['', [Validators.required, Validators.email]],
      password:          ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      ]],
      confirmPassword:   ['', Validators.required],
      direccionDespacho: [''],
      fechaNacimiento:   ['', [Validators.required, this.ageValidator]]
    }, { validators: this.passwordsMatchValidator });
  }

  /**
   * @description Verifica que las contraseñas coincidan
   * @param group Grupo de controles
   * @returns Errores o null
   */
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors|null {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p && c && p !== c ? { passwordsMismatch: true } : null;
  }

  /**
   * @description Comprueba que la edad sea mayor o igual a 13
   * @param control Control con la fecha
   * @returns Errores o null
   */
  private ageValidator(control: AbstractControl): ValidationErrors|null {
    const val = control.value;
    if (!val) return null;
    const dob = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    return age < 13 ? { ageTooLow: true } : null;
  }

  /**
   * @description Guarda el usuario si el formulario es válido
   * @returns void
   */
  registrar(): void {
    if (this.registroForm.invalid) {
      if (this.registroForm.errors?.['passwordsMismatch']) {
        this.error = 'Las contraseñas no coinciden.';
      } else if (this.registroForm.get('password')?.hasError('pattern')) {
        this.error = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.';
      } else if (this.registroForm.get('fechaNacimiento')?.hasError('ageTooLow')) {
        this.error = 'Debes tener al menos 13 años.';
      } else {
        this.error = 'Revisa los campos obligatorios.';
      }
      this.mensaje = '';
      return;
    }
    const u = this.registroForm.value;
    const nuevo: Usuario = {
      nombre: u.nombre,
      email: u.email,
      password: u.password,
      rol: 'usuario',
      direccionDespacho: u.direccionDespacho,
      fechaNacimiento: u.fechaNacimiento
    };
    const lista: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (lista.some(x => x.email === nuevo.email)) {
      this.error = 'El correo ya está registrado.'; this.mensaje = ''; return;
    }
    lista.push(nuevo);
    localStorage.setItem('usuarios', JSON.stringify(lista));
    this.mensaje = 'Cuenta creada correctamente.'; this.error = '';
    this.registroForm.reset();
  }

  /**
   * @description Limpia el formulario y mensajes
   * @returns void
   */
  limpiar(): void {
    this.registroForm.reset();
    this.error = '';
    this.mensaje = '';
  }
}
