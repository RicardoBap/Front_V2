import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade, Estado } from 'src/app/core/geral-grupos.model';
import { AuthService } from 'src/app/seguranca/auth.service';
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
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de cidades')
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
      //console.log(resultado)      
      this.totalRegistros = resultado.total
      this.cidades = resultado.cidades           
    })
    .catch(erro => this.errorHandler.handle(erro))
  }
  
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.pesquisar(pagina)
  }

  confirmarExclusao(cidade: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cidade)
      }
    })
  }

  excluir(cidade: any) {
    this.cidadeService.excluir(cidade.codigo)
      .then(() => {
        if (this.grid.first === 0 ) {
          this.pesquisar()
        } else {
          this.grid.first = 0
        }
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Cidade excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

}
