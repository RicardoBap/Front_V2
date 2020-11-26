import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
 
  constructor(
    private cidadeService: CidadeService,
    private errorHandler: ErrorHandlerService  
  ) {}

  ngOnInit(): void {
    this.carregarEstados()
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

   /*
  cadastrar(cidadeForm: NgForm) {
    console.log(this.cidade)
    this.cidadeService.salvar(this.cidade)
      .subscribe((cidade) => {
        cidade = cidade.codigo
      })    
  } */

  cadastrar(grupoForm: NgForm) {  
    //console.log(this.grupo) 
    this.cidadeService.adicionar(this.cidade)
    .then(idCidadeCadastrada => {
      this.idCidadeCadastrada = idCidadeCadastrada.codigo
      //this.messageService.add(
        //{severity:'success', summary:'Service Message', detail:'Cidade adicionada com sucesso!'});

      //this.router.navigate([ '/cidades/', idCidadeCadastrada.codigo ])     
    } ) 
  .catch(erro => this.errorHandler.handle(erro))
  }

}

/*
this.estados = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  */
