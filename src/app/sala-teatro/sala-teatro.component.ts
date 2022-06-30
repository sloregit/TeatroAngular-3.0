import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-sala-teatro',
  templateUrl: './sala-teatro.component.html',
  styleUrls: ['./sala-teatro.component.css'],
})
export class SalaTeatroComponent implements OnInit {
  @Input() spettacolo: Observable<Spettacolo>;
  @Output() spettacoloChange = new EventEmitter();
  nomeSpettacolo: string;
  @Input() nomeUtente: string;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  @Input() rapido: boolean;
  constructor() {}
  foo($event) {}
  //prenotazione Veloce
  prenotaVeloce($event, zona, fila, posto) {
    $event.nomePosto = this.nomeUtente;
    console.log($event);
    this.spettacolo.subscribe((spettacolo: Spettacolo) => {
      spettacolo.teatro[zona][fila][posto] = this.nomeUtente;
    });
    this.spettacoloChange.emit(this.spettacolo);
  }
  ngOnInit() {
    this.spettacolo.subscribe((spettacolo: Spettacolo) => {
      this.platea = spettacolo.teatro.platea;
      this.palco = spettacolo.teatro.palco;
    });
  }
}
/**
 //PER AGGIORNARE LO SPETTACOLO
    this.spettacolo.subscribe((val) => {
      val.nomeSpettacolo = this.nomeSpettacolo;
      val.teatro = this.
      this.spettacoloChange.emit(this.spettacolo);
    });
 */
