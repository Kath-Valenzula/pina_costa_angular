import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

interface Usuario {
  nombre: string;
  email: string;
  password: string;
  confirmPassword?: string;
  direccionDespacho?: string;
  fechaNacimiento?: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  error: string = '';
  mensaje: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:            ['', Validators.required],
      email:             ['', [Validators.required, Validators.email]],
      password:          ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/)
      ]],
      confirmPassword:   ['', Validators.required],
      direccionDespacho: [''],
      fechaNacimiento:   ['', [Validators.required, this.ageValidator]]
    }, { validators: this.passwordsMatchValidator });
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors|null {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p && c && p !== c ? { passwordsMismatch: true } : null;
  }

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

  registrar(): void {
    if (this.registroForm.invalid) {
      if (this.registroForm.errors?.['passwordsMismatch']) {
        this.error = 'Las contraseñas no coinciden.';
      } else if (this.registroForm.get('password')?.hasError('pattern')) {
        this.error = 'La contraseña debe tener 6-18 chars, 1 mayúscula y 1 dígito.';
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

  limpiar(): void {
    this.registroForm.reset();
    this.error = '';
    this.mensaje = '';
  }
}
