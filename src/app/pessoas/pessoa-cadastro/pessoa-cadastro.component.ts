import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Pessoa } from './../../core/model';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa()

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title ){}

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo']
    if(codigoPessoa) {
      this.carregarPessoa(codigoPessoa)
    }

    this.title.setTitle('Nova pessa')
  }

  salvar(pessoaForm: NgForm) {
    if (this.atualizando) {
      this.atualizarPessoa(this.pessoa.codigo)
    } else {
      this.adicionarPessoa(pessoaForm)
    }
  }

  get atualizando() {
    return Boolean(this.pessoa.codigo)
  }

  adicionarPessoa(pessoaForm: NgForm) {   
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add(
        {severity:'success', summary:'Service Message', detail:'Pessoa adicionado com sucesso!'});

      pessoaForm.reset()
      this.pessoa = new Pessoa()
    } )
  .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarPessoa(codigo) {
    this.pessoaService.atualizar(this.pessoa, codigo)
    .then(pessoa => {
      this.pessoa = pessoa

      this.messageService.add(
        {severity:'success', summary:'Service Message', detail:'Pessoa atualizada com sucesso!'});
      this.atualizarTitulo() // <---- TITULO
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa
      this.atualizarTitulo() // <----- TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo(pessoaForm: NgForm) {
    pessoaForm.reset()

    setTimeout(function() {
      this.pessoa = new Pessoa()
    }.bind(this), 1)

    this.router.navigate([ 'pessoas/nova' ])
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de pessoa: ${this.pessoa.nome}`)
  }

}
