import { Component, OnInit } from '@angular/core';

import { EventoService } from '../evento.service';

@Component({
  selector: 'app-eventos-pesquisa',
  templateUrl: './eventos-pesquisa.component.html',
  styleUrls: ['./eventos-pesquisa.component.css']
})
export class EventosPesquisaComponent implements OnInit {
    
  eventos = []
  
    constructor(private eventoService: EventoService) { }

    ngOnInit() {
      this.eventoService.getEventos()
      .then((eventos: any[]) => {
        //console.log('navegacao-grupos.component', grupos)
        this.eventos = eventos
      })
    }
    

}
