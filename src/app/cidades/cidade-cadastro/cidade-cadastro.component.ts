import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade, Estado } from 'src/app/core/geral-grupos.model';

import { CidadeService } from '../cidade.service';


@Component({
  selector: 'app-cidade-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.css']
})

export class CidadeCadastroComponent implements OnInit {

  cidade = new Cidade()
  estado = new Estado()
  estados: any[]
  cidades: any[]
  idCidadeCadastrada: number
  estadoSelecionado: number
 
  constructor(
    private cidadeService: CidadeService,
    private errorHandler: ErrorHandlerService ,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    const codigoCidade = this.route.snapshot.params['codigo']
    this.title.setTitle('Novo grupo')
    this.carregarEstados()

    if(codigoCidade) {      
      this.carregarCidadeParaAtualizar(codigoCidade)
    }
  }

  get atualizando() {
    return Boolean(this.cidade.codigo)
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de cidade: ${this.cidade.nome}`)
  } 

  salvar(cidadeForm: NgForm) {
    if (this.atualizando) {
      this.atualizarCidade(this.cidade.codigo)
    } else {
      this.cadastrar(cidadeForm)
    }
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

  cadastrar(cidadeForm: NgForm) {  
    this.cidadeService.adicionar(this.cidade)
    .then(idCidadeCadastrada => {
      this.idCidadeCadastrada = idCidadeCadastrada.codigo        
    } ) 
  .catch(erro => this.errorHandler.handle(erro))
  }

  carregarCidadeParaAtualizar(codigo: number) {
    this.cidadeService.buscarPeloCodigo(codigo)
      .then(cidade => {
        this.cidade = cidade

        this.estadoSelecionado = (this.cidade) ? this.cidade.estado.codigo : null
        
        if (this.estadoSelecionado) {
          this.carregarCidades()
        }  
        this.atualizarTitulo() // <----- TITULO    
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  
  carregarCidades() {
    //this.cidadeLoading = true 
    this.cidadeService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {  
        //this.cidadeLoading = false    
        this.cidades = lista.map(c => (
          { label: c.nome, value: c.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro))
  } 

  atualizarCidade(codigo) {
    this.cidadeService.atualizar(this.cidade, codigo)
      .then(cidade => {
        this.cidade = cidade

        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Cidade atualizada com sucesso!'});
          this.atualizarTitulo() // <--------- TITULO ATUALIZA
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo(cidadeForm: NgForm) {
    cidadeForm.reset()

    setTimeout(function() {
      this.cidade = new Cidade()
    }.bind(this), 1)

    this.router.navigate([ 'cidades/nova' ])
  }

}


