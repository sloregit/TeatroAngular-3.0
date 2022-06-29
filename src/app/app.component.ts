import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable } from 'rxjs';

export class Spettacolo {
  nomeSpettacolo: string;
  teatro: Teatro;
}
export class Teatro {
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  datiIn: Array<Spettacolo>;
  constructor(private TeatroDBService: TeatroDBService) {}
  getDati() {
    this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res) => {
        console.log(typeof res);
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
}
