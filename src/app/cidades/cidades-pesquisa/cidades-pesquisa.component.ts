import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade, Estado } from 'src/app/core/geral-grupos.model';
import { CidadeFiltro, CidadeService } from '../cidade.service';

@Component({
  selector: 'app-cidades-pesquisa',
  templateUrl: './cidades-pesquisa.component.html',
  styleUrls: ['./cidades-pesquisa.component.css']
})
export class CidadesPesquisaComponent implements OnInit {

  //cidade = new Array<Cidade>()
  //estado = new Estado()
  estados: []
  cidades: []

  totalRegistros = 0
  filtro = new CidadeFiltro()
  @ViewChild('tabela') grid

  
  constructor(
    private cidadeService: CidadeService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarEstados()
    this.pesquisar()
  }

  carregarEstados() {
    this.cidadeService.listarEstados()
      .then(estados => {
        this.estados = estados
        .map(e => {
          return { label: e.nome, value: e.codigo }
        })
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina   
    this.cidadeService.pesquisar( this.filtro )
    .then(resultado => {
      console.log(resultado)      
      this.totalRegistros = resultado.total
      this.cidades = resultado.cidades           
    })
    .catch(erro => this.errorHandler.handle(erro))
  }
  
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.pesquisar(pagina)
  }

  

 

}
