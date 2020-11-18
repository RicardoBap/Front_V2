import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService } from './../usuario.service';
import { Permissao, Usuario } from './../../core/usuario.model';
import { Validacoes } from './../validacoes';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
  providers: [ UsuarioService ]
})
export class UsuarioCadastroComponent implements OnInit {


  permissoes: Array<Permissao> = [
    { codigo: 3, descricao: 'ROLE_PESQUISAR_CATEGORIA'},
    { codigo: 6, descricao: 'ROLE_PESQUISAR_PESSOA'},
    { codigo: 9, descricao: 'ROLE_PESQUISAR_LANCAMENTO'}
  ]; // Inicia com permissao para pesquisar pessoas e lancamentos
  selecione: Permissao; // Mostra as opções
  formulario: FormGroup
  //codigo: number
  usuario: Usuario

  criarFormularioDeUsuario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]) ],
      email: ['', Validators.compose([ Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50) ])],
      senha: ['', Validators.compose([ Validators.required, Validators.minLength(6), Validators.maxLength(12) ])],
      confirmarSenha: ['', Validators.compose([ Validators.required ])]
      //permissoes: []
    },
    {
      validator: Validacoes.SenhasCombinam
    });
  }

    constructor(
      private usuarioService: UsuarioService,
      private errorHandler: ErrorHandlerService,
      private fb: FormBuilder,
      private messageService: MessageService,
      private title: Title
    ) {}

    ngOnInit(){
      //this.carregarPermissoes();
      this.criarFormularioDeUsuario();

      this.title.setTitle('Cadastro de usuários')
    }
/*
    carregarPermissoes() {
      this.usuarioService.listarTodas()
        .then(permissoes => {
          this.permissoes = permissoes
          .map(p => {
            return { descricao: p.descricao, codigo: p.codigo }
          })
        })
        .catch(erro => this.errorHandler.handle(erro))
    }
*/
    adicionarUsuario(): void {
      //console.log(this.formulario.status)
      let usuario = new Usuario (
        this.formulario.value.nome,
        this.formulario.value.email,
        this.formulario.value.senha,
        this.permissoes
      )
      //console.log('teste inserindo usuario', usuario)
      this.usuarioService.adicionar(usuario)
        .then(() => {
          this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Você se cadastrou com sucesso!'});

          this.formulario.reset()
          } )
        .catch(erro => this.errorHandler.handle(erro))
      }

}
