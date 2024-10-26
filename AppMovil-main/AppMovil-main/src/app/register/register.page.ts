import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email, institutionalEmailValidator]],
      rut: ['', [Validators.required, rutValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  // Método que se ejecuta al enviar el formulario
  async onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      console.log(`Usuario registrado: ${name}, ${email}`);
      // Simular alguna operación, como redirigir
      await this.navCtrl.navigateForward('/carga-pagina');
    }
  }

  // Método para redirigir al login
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Obtener el estado de un campo para mostrar el icono
  getFieldState(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (control?.invalid && control?.touched) {
      return 'invalid';
    } else if (control?.valid && control?.touched) {
      return 'valid';
    } else {
      return null;
    }
  }
}

// Validador personalizado para correos institucionales
export function institutionalEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value as string;
  const validInstitutionalEmail = email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
  return validInstitutionalEmail ? null : { 'invalidDomain': true };
}

// Validador para confirmar que las contraseñas coinciden
export function passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { 'passwordsMismatch': true };
}

export function rutValidator(control: AbstractControl): ValidationErrors | null {
  const rut = control.value as string;

  // Verifica que el formato del RUT sea correcto: dígitos seguidos por un guion y un dígito verificador (número o K)
  const rutPattern = /^[0-9]+-[0-9Kk]{1}$/;
  if (!rutPattern.test(rut)) {
    return { invalidFormat: true };
  }

  // Separar el número del RUT y el dígito verificador
  const [rutBody, verifier] = rut.split('-');
  if (!validateRut(rutBody, verifier)) {
    return { invalidRut: true };
  }

  return null; // Si es válido, retornar null
}

/**
 * Lógica para validar el RUT chileno (sin puntos y con guion antes del dígito verificador).
 * @param rutBody Parte numérica del RUT (sin puntos ni guion)
 * @param verifier Dígito verificador del RUT (puede ser número o 'K')
 */
function validateRut(rutBody: string, verifier: string): boolean {
  let total = 0;
  let multiplier = 2;

  // Recorrer el RUT desde el final hacia el inicio, aplicando la multiplicación
  for (let i = rutBody.length - 1; i >= 0; i--) {
    total += parseInt(rutBody.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1; // Ciclo de multiplicadores de 2 a 7
  }

  const remainder = 11 - (total % 11);
  const calculatedVerifier = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

  // Comparar el dígito verificador ingresado con el calculado
  return calculatedVerifier.toUpperCase() === verifier.toUpperCase();
}