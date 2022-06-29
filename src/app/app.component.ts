import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  datiIn;
  constructor(private TeatroDBService: TeatroDBService) {}
  getDati() {
    this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res: string) => {
        this.datiIn = JSON.parse(res);
        console.log(this.datiIn)
        /*for (let elem in this.datiIn) {
          this.arrayNomeSpettacoli.push(this.datiIn[elem].nomeSpettacolo);
        }*/
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
}
