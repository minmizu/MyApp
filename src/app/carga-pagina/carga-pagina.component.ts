import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carga-pagina',
  templateUrl: './carga-pagina.component.html', // aquí estaba mal el template
  styleUrls: ['./carga-pagina.component.scss'],
})
export class CargaPaginaComponent implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // la animación mostrará por 3 seg y luego se dirige a la pag de inicio
    setTimeout(() => {
      this.navCtrl.navigateForward('/welcome');
    }, 3000); // cambia a la página de inicio después de 3 segs
  }
}
