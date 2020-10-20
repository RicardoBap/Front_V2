import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {MessageService} from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0
  filtro = new LancamentoFiltro()
  lancamentos = []
  @ViewChild('tabela') grid

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos')
   }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.lancamentoService.pesquisar( this.filtro )
    .then(resultado => {
      this.totalRegistros = resultado.total
      this.lancamentos = resultado.lancamentos
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows
    this.pesquisar(pagina)
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento)
      }
    })
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0 ) {
          this.pesquisar()
        } else {
          this.grid.first = 0
        }
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Lançamento excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

}





/*
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de Pão', dataVencimento: '30/06/2017',
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},

    { tipo: 'RECEITA', descricao: 'Venda de Software', dataVencimento: '10/06/2017',
      dataPagamento: '09/06/2017', valor: 80.000, pessoa: 'Atacado Brasil'},

    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda'},

    { tipo: 'DESPESA', descricao: 'Mensalidade da escola', dataVencimento: '05/06/2017',
      dataPagamento: '30/05/2017', valor: 800, pessoa: 'Escola Abelha Rainha'},

    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza'},

    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
      dataPagamento: '09/07/2017', valor: 1750, pessoa: 'Casa Nova Imóveis'},

    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
      dataPagamento: null, valor: 180, pessoa: 'Academia Top'}
  ] */
