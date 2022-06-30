import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable, of, pipe, filter, map, throwError } from 'rxjs';

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
  spettacoliIn$: Observable<Array<Spettacolo>>;
  admin: boolean;
  spettacoloScelto: string;
  nomeUtente: string;
  spettacolo: Observable<Spettacolo>;
  rapido: boolean;
  constructor(private TeatroDBService: TeatroDBService) {}

  //Ho il nomeUtente e lo spettacolo
  //spettacolo generato, observable così mi iscrivo quando mi serve il valore
  ///////////////////////////QUI
  getTeatro(rapido) {
    this.rapido = rapido;
    let spettacoloObs$: Observable<Array<Spettacolo>> = this.spettacoliIn$.pipe(
      map((spettacoli: Array<Spettacolo>) =>
        spettacoli.filter(
          (spettacolo: Spettacolo) =>
            spettacolo.nomeSpettacolo === this.spettacoloScelto
        )
      )
    );
    spettacoloObs$.subscribe({
      next: (spettacolo: Spettacolo[]) =>
        (this.spettacolo = new Observable((subscriber) =>
          subscriber.next(spettacolo[0])
        )),
      error: (e) => console.error('' + JSON.stringify(e)),
    });
  }

  foo2() {
    this.spettacolo.subscribe((val) => console.log(val));
  }
  //conferma le prenotazioni
  confermaPrenotazioni() {
    this.spettacolo.subscribe((spettacolo) => console.log(spettacolo));
  }
  getDati(admin) {
    this.admin = admin;
    this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res: string) => {
        this.spettacoliIn$ = of(JSON.parse(res));
      },
      error: (e) =>
        console.error('Observer got an error: ' + JSON.stringify(e)),
    });
  }
}
