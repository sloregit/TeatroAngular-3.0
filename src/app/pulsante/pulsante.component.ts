import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pulsante',
  templateUrl: './pulsante.component.html',
  styleUrls: ['./pulsante.component.css'],
})
export class PulsanteComponent implements OnInit {
  @Output() cliccato = new EventEmitter();
  @Input() nomePosto: string;
  @Input() prenotato: boolean;
  @Input() rapido: boolean;
  @Output() nomePostoEmitter = new EventEmitter<string>();
  constructor() {}
  //selezionati = new Observable();
  prenotaV() {
    if (!this.prenotato) {
      this.cliccato.emit(this);
    }
  }
  mostraNome() {
    if (this.nomePosto) {
      this.nomePostoEmitter.emit(this.nomePosto);
    }
  }
  ngOnInit() {}
}
