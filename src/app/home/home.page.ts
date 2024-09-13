import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.institutionalEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]  // Validar que el checkbox esté marcado
    });
  }

  institutionalEmailValidator(control: AbstractControl) {
    const email = control.value;
    const validInstitutionalEmail = email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
    return validInstitutionalEmail ? null : { invalidDomain: true };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Verifica las credenciales del usuario
      if (this.authenticateUser(email, password)) {
        // Redirige a la página de bienvenida si las credenciales son correctas
        this.navCtrl.navigateForward('/welcome');
      } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }
  }

  authenticateUser(email: string, password: string): boolean {
    // Verifica si el email es válido y si la contraseña cumple con el criterio
    const institutionalEmailPattern = /^(.*@duocuc\.cl|.*@profesor\.duoc\.cl)$/;
    const validInstitutionalEmail = institutionalEmailPattern.test(email);

    // Aquí se podría agregar una verificación real de la contraseña,
    // pero para el ejemplo simplemente validaremos el email.
    return validInstitutionalEmail && password.length >= 6;
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}

