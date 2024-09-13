import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage {

  constructor() {}
  
  scanQRCode() {
    console.log(1); // Simulación de la lectura del código QR
  }
}
