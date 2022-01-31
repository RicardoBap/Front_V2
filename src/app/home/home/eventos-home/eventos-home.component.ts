import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/core/geral-grupos.model';

import { HomeService } from '../../home.service';

@Component({
  selector: 'app-eventos-home',
  templateUrl: './eventos-home.component.html',
  styleUrls: ['./eventos-home.component.css']
})
export class EventosHomeComponent implements OnInit {

  public eventosHome: Evento[]
  public eventos: Observable<any[]>

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.carregarEventos()   
  }

  carregarEventos() {
    this.eventos = this.homeService.getEventos()
    this.eventos.subscribe(
      (eventos: Evento[]) => {
        //console.log('carregarEventos', this.eventos) // <---- OK
        this.eventosHome = eventos
        //console.log('carregarEventosHome', this.eventosHome),
        //err => console.log('Erro status', err.status),
        //() => console.log('Fluxo de eventos completo!')
      })
  }

}
