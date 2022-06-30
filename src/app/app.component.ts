import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable, of } from 'rxjs';

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
  spettacoliIn: Observable<Array<Spettacolo>>;
  admin: boolean;
  spettacoloScelto: string;
  nomeUtente: string;
  constructor(private TeatroDBService: TeatroDBService) {}

  //Ho il nomeUtente e lo spettacolo
  foo() {
    console.log(this.nomeUtente);
    console.log(this.spettacoloScelto);
  }
  getDati(admin) {
    this.admin = admin;
    this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res: string) => {
        this.spettacoliIn = of(JSON.parse(res));
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
}
