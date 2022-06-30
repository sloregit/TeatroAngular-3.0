import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  @Input() spettacoli: Observable<Array<Spettacolo>>;
  nomiSpettacoli: Array<string> = [];
  constructor() {}
  vediSpettacoli() {
    this.spettacoli.subscribe((spettacolo: Array<Spettacolo>) => {
      spettacolo.filter((spettacolo) =>
        this.nomiSpettacoli.push(spettacolo.nomeSpettacolo)
      );
    });
    console.log(this.nomiSpettacoli);
  }

  ngOnInit() {}
}
