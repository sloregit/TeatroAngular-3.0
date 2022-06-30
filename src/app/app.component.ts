import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable, of, pipe, filter, map } from 'rxjs';

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
  spettacolo: Spettacolo;
  constructor(private TeatroDBService: TeatroDBService) {}

  //Ho il nomeUtente e lo spettacolo
  //spettacolo generato
  ///////////////////////////QUI
  foo() {
    let spettacoloObs$: Observable<Array<Spettacolo>> = this.spettacoliIn.pipe(
      map((spettacoli: Array<Spettacolo>) =>
        spettacoli.filter(
          (spettacolo: Spettacolo) =>
            spettacolo.nomeSpettacolo === this.spettacoloScelto
        )
      )
    );

    spettacoloObs$.subscribe(
      (spettacolo: Spettacolo[]) => (this.spettacolo = spettacolo[0])
    );
  }
  foo2() {
    console.log(this.spettacolo);
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
