import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { PessoaService, PessoasFiltro } from './../pessoa.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0
  filtro = new PessoasFiltro()
  pessoas = []
  @ViewChild('tabela')  grid

  constructor(
    private pessoasService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas')
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.pessoasService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total
        this.pessoas = resultado.pessoas
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.pesquisar(pagina)   
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa)
      }
    })
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(response => {
        //console.log('EXcluido')
        if (this.grid.first === 0) {
          this.pesquisar()
        } else {
          this.grid.first = 0
        }
          this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Pessoa excluído com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoasService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'Membro ativado' : 'Membro desativado';

        //pessoa.ativo = novoStatus
        this.pesquisar()  //<-----------atualiza o status
        if (this.grid.first === 0) {
          this.pesquisar()
        } else {
          this.grid.first = 0
        }

        this.messageService.add
          ({ summary: acao, severity: 'success', life: 3000 })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

/*
 pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', status: true },
    { nome: 'Sebastião Silva', cidade: 'São Paulo', estado: 'SP', status: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', status: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', status: true },
    { nome: 'Vilmar Trindade', cidade: 'Rio de Janeiro', estado: 'RJ', status: false },
    { nome: 'Ricardo Kumagae', cidade: 'Campinas', estado: 'SP', status: true },
    { nome: 'Albertina Baptistini', cidade: 'Araraquara', estado: 'SP', status: false },
    { nome: 'Katita Mel', cidade: 'Sao Bernardo', estado: 'SP', status: false }
  ]
  */
