import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit{
  userEmail: string | null='';
  constructor() {}
  
  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');  // Recuperamos el correo del localStorage
  }

  scanQRCode() {
    console.log(1); // Simulación de la lectura del código QR
  }
}
