import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ FormBuilder ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe tener controles password y confirmPassword', () => {
    expect(component.registroForm.contains('password')).toBeTrue();
    expect(component.registroForm.contains('confirmPassword')).toBeTrue();
  });

  it('passwordsMatchValidator devuelve null si coinciden', () => {
    component.registroForm.get('password')!.setValue('Abc123');
    component.registroForm.get('confirmPassword')!.setValue('Abc123');
    const errors: ValidationErrors | null = component.registroForm.errors as ValidationErrors;
    expect(errors).toBeNull();
  });

  it('passwordsMatchValidator marca error si difieren', () => {
    component.registroForm.get('password')!.setValue('Abc123');
    component.registroForm.get('confirmPassword')!.setValue('Xyz789');
    const errors = component.registroForm.errors as ValidationErrors;
    expect(errors!['passwordsMismatch']).toBeTrue();
  });

  it('registrar no procede si el formulario es inválido', () => {
    component.registroForm.get('nombre')!.setValue('');   
    component.registroForm.get('email')!.setValue('');    
    component.registroForm.get('password')!.setValue('Abc123');
    component.registroForm.get('confirmPassword')!.setValue('Abc123');
    component.registroForm.get('fechaNacimiento')!.setValue('2000-01-01');
    component.registroForm.get('direccionDespacho')!.setValue('');
    component.registroForm.markAllAsTouched();

    component.registrar();
    expect(component.error).toBe('Revisa los campos obligatorios.');
    expect(component.mensaje).toBe('');
  });
});
