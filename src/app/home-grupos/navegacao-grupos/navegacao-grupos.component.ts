import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Grupo } from 'src/app/core/geral-grupos.model';
import { HomeGruposService } from '../home-grupos.service';


@Component({
  selector: 'app-navegacao-grupos',
  templateUrl: './navegacao-grupos.component.html',
  styleUrls: ['./navegacao-grupos.component.css']
})
export class NavegacaoGruposComponent implements OnInit {

  public grupos: Grupo[]

  constructor(
    private homeGruposService: HomeGruposService,
    private route: ActivatedRoute // <------------Pesquisa
    ) { }
  
  ngOnInit(): void {
    this.homeGruposService.getGrupos()
      .then((grupos: Grupo[]) => {
        //console.log('navegacao-grupos.component', grupos)
        this.grupos = grupos
      })
  } 

}
