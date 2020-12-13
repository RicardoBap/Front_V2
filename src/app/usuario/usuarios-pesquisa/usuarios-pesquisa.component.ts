import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService, UsuarioFiltro } from './../usuario.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css'],
  providers: [ UsuarioService ]
})
export class UsuariosPesquisaComponent implements OnInit {

  totalRegistros = 0
  filtro = new UsuarioFiltro()
  usuarios = []
  @ViewChild('tabela')  grid

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    public auth: AuthService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de usuários')
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina
    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total
        this.usuarios = resultado.usuarios
        //console.log(this.usuarios)
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
    this.usuarioService.excluir(pessoa.codigo)
      .then(response => {
        if (this.grid.first === 0) {
          this.pesquisar()
        } else {
          this.grid.first = 0
        }
          this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Usuário excluído com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  alternarStatus(usuario: any): void {
    const novoStatus = !usuario.ativo;

    this.usuarioService.mudarStatus(usuario.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'Usuario ativado para fazer login' : 'Usuario desativado para fazer login';

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

} //FIM
