import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Grupo } from 'src/app/core/geral-grupos.model';
import { HomeGruposService } from '../home-grupos.service';

@Component({
  selector: 'app-navegacao-pesquisa',
  templateUrl: './navegacao-pesquisa.component.html',
  styleUrls: ['./navegacao-pesquisa.component.css']
})
export class NavegacaoPesquisaComponent implements OnInit {

  //public grupo: Grupo[]

  grupo = new Grupo()

  constructor(
    private homeGruposService: HomeGruposService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((parametros: Params) => {

      this.homeGruposService.getGrupoPeloCodigo(parametros.codigo) 
      .then((grupo: any) => {
        //console.log(grupo)
        this.grupo = grupo
      })

      parametros.codigo
    })
   
  }

}
