import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.institutionalEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  institutionalEmailValidator(control: any) {
    const email = control.value;
    const validInstitutionalEmail = email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
    return validInstitutionalEmail ? null : { 'invalidDomain': true };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordsMismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      console.log(`Usuario registrado: ${name}, ${email}`);
      // Redirige primero a la página de carga
      this.navCtrl.navigateForward('/carga-pagina');
    }
  }
  

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
