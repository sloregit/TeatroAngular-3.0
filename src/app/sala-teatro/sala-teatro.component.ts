import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-sala-teatro',
  templateUrl: './sala-teatro.component.html',
  styleUrls: ['./sala-teatro.component.css'],
})
export class SalaTeatroComponent implements OnInit {
  @Input() rapido: boolean;
  @Input() spettacolo: Observable<Spettacolo>;
  @Output() spettacoloChange = new EventEmitter();
  @Input() nomeUtente: string;
  nomeSpettacolo: string;
  nomePosto: string;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  prenotato: boolean;
  constructor() {}
  foo($event) {}
  //prenotazione Veloce
  prenotaVeloce(zona: string, fila: number, posto: number) {
    this.spettacolo.subscribe(
      (spettacolo: Spettacolo) =>
        (spettacolo.teatro[zona][fila][posto] = this.nomeUtente)
    );
    this.prenotato = true;
    this.spettacoloChange.emit(this.spettacolo);
  }
  //mostra il nome del posto prenotato
  mostraNome($event) {
    this.nomePosto = $event;
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
