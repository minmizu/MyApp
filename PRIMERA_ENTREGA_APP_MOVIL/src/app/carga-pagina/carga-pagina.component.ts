import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IonicModule } from '@ionic/angular'; // Importa los módulos de Ionic

@Component({
  selector: 'app-carga-pagina',
  templateUrl: './carga-pagina.component.html',
  styleUrls: ['./carga-pagina.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule, 
    IonicModule // Asegúrate de importar IonicModule para poder usar los componentes de Ionic
  ]
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
