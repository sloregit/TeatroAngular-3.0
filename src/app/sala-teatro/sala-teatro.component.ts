import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Spettacolo } from '../app.component';

export class Prenotazione {
  zona: string;
  nome: string;
  fila: number;
  posto: number;
  constructor(zona: string, nome: string, fila: number, posto: number) {
    this.zona = zona;
    this.nome = nome;
    this.fila = fila;
    this.posto = posto;
  }
}

export class Selezione {
  selezionati;
  constructor() {
    this.selezionati = [];
  }
  aggiungi(prenotazione) {
    this.selezionati.push(prenotazione);
  }
  rimuovi(fila: number, posto: number) {
    this.selezionati.map((old, i) => {
      if (old.fila === fila && old.posto === posto) {
        this.selezionati.splice(i, 1);
      }
    });
  }
}

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
  newPrenotazione: Prenotazione;
  selezionati;
  selezionato: boolean;
  constructor() {
    if (!this.rapido) {
      this.selezionati = new Selezione();
    }
  }
  confermaPrenotazioni() {
    this.spettacolo.subscribe((spettacolo: Spettacolo) => {
      this.selezionati.map((elem) => console.log(elem));
    });
  }
  seleziona(zona: string, fila: number, posto: number) {
    this.newPrenotazione = new Prenotazione(zona, this.nomeUtente, fila, posto);
    if (this.selezionato === true) {
      this.selezionati.aggiungi(this.newPrenotazione);
    } else {
      this.selezionati.rimuovi(fila, posto);
    }
    console.log(this.selezionati);
  }
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
