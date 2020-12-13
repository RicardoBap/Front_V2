import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../home.service';

@Component({
  selector: 'app-eventos-home',
  templateUrl: './eventos-home.component.html',
  styleUrls: ['./eventos-home.component.css']
})
export class EventosHomeComponent implements OnInit {

  eventos = []

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getEventos()
    .then((eventos: any[]) => {
      //console.log('navegacao-eventos.component', eventos)
      this.eventos = eventos
    })
  }

}
