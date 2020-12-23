import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Lancamento } from './../../core/model';

import { CategoriaService } from './../../categorias/categorias.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = []
  pessoas = []
  lancamento = new Lancamento()
  codigo: number

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
    //this.route.snapshot.params['codigo']
    const codigoLancamento = this.route.snapshot.params['codigo']
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento)
    }

    this.title.setTitle('Novo lançamento')

    this.carregarCategorias()
    this.carregarPessoas()
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
        .map(c => {
          return { label: c.nome, value: c.codigo }
        })
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
        .map(p => {
          return { label: p.nome, value: p.codigo }
        })
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  adicionarLancamento(lancamentoForm: NgForm) {    
    this.lancamentoService.adicionar(this.lancamento)    
      .then(lancamentoAdicionado => {
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Lançamento adicionado com sucesso!'});

        //lancamentoForm.reset()
        //this.lancamento = new Lancamento()
        this.router.navigate([ '/lancamentos/', lancamentoAdicionado.codigo ])
      })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(lancamentoForm: NgForm) {
    if (this.atualizando) {
      this.atualizarLancamento(this.lancamento.codigo)
    } else {
      this.adicionarLancamento(lancamentoForm)
    }
  }

  atualizarLancamento(codigo) {
    this.lancamentoService.atualizar(this.lancamento, codigo)
      .then(lancamento => {
        this.lancamento = lancamento

        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Lançamento atualizado com sucesso!'});
          this.atualizarTitulo() // <--------- TITULO ATUALIZA
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  get atualizando() {
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number) {
    //console.log(codigo)
    this.lancamentoService.buscarPeloCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento
        this.atualizarTitulo() // <----------TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset()

    setTimeout(function() {
      this.lancamento = new Lancamento()
    }.bind(this), 1)

    this.router.navigate([ 'lancamentos/novo' ])
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de lançamento: ${this.lancamento.descricao}`)
  }

}

/*
categorias = [
    {label: 'Alimentação', value: '1'},
    {label: 'Transporte', value: '2'}
  ]

pessoas =  [
  {label: 'João da Silva', value: '1'},
  {label: 'Sebastião de Souza', value: '2'},
  {label: 'Maria Abadia', value: '3'}
]

*/
