import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() spettacoli: Observable<Array<Spettacolo>>;
  @Input() spettacoloScelto: string;
  @Input() nomeUtente: string;
  @Output() spettacoloSceltoChange = new EventEmitter<string>();
  @Output() nomeUtenteChange = new EventEmitter<string>();
  nomiSpettacoli: Array<string>;

  logged: boolean;
  constructor() {
    this.nomiSpettacoli = [];
  }
  seleziona($event) {
    this.spettacoloSceltoChange.emit($event.target.value);
  }
  inInput($event) {
    this.nomeUtenteChange.emit($event.target.value);
  }
  ngOnInit() {
    this.spettacoli.subscribe((spettacolo: Array<Spettacolo>) => {
      spettacolo.filter((spettacolo) =>
        this.nomiSpettacoli.push(spettacolo.nomeSpettacolo)
      );
    });
    console.log(this.nomiSpettacoli);
  }
}
