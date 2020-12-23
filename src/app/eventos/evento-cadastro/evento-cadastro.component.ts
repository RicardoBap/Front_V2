import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Evento } from 'src/app/core/geral-grupos.model';
import { GeralGruposService } from 'src/app/geral-grupos/geral-grupos.service';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css']
})
export class EventoCadastroComponent implements OnInit {

  checked: boolean
  grupos = []
  evento = new Evento()

  constructor(
    private geralGruposService: GeralGruposService,
    private eventoService: EventoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {    
    const codigoEvento = this.route.snapshot.params['codigo']
    if (codigoEvento) {
      this.carregarEvento(codigoEvento)
    }

    this.title.setTitle('Novo evento')

    this.carregarGrupos()
  }

  carregarGrupos() {
    this.geralGruposService.listarTodas()
      .then(grupos => {
        this.grupos = grupos
        .map(g => {
          return { label: g.nome, value: g.codigo }
        })
      })
      .catch(erro => this.errorHandler.handle(erro))
  }


  adicionarEvento(eventoForm: NgForm) {
    this.eventoService.adicionar(this.evento)   
      .then(eventoAdicionado => {
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Evento adicionado com sucesso!'});

        //lancamentoForm.reset()
        //this.lancamento = new Lancamento()
        this.router.navigate([ '/eventos/', eventoAdicionado.codigo ])
      })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(eventoForm: NgForm) {
    if (this.atualizando) {
      this.atualizarEvento(this.evento.codigo)
    } else {
      this.adicionarEvento(eventoForm)
    }
  }

  atualizarEvento(codigo) {
    this.eventoService.atualizar(this.evento, codigo)
      .then(evento => {
        this.evento = evento

        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Evento atualizado com sucesso!'});
          this.atualizarTitulo() // <--------- TITULO ATUALIZA
      })
      .catch(erro => this.errorHandler.handle(erro))
  }
  
  carregarEvento(codigo: number) {    
    this.eventoService.buscarPeloCodigo(codigo)
      .then(evento => {
        //console.log(evento)
        this.evento = evento
        this.atualizarTitulo() // <----------TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  get atualizando() {
    return Boolean(this.evento.codigo)
  }

  novo(eventoForm: NgForm) {
    eventoForm.reset()

    setTimeout(function() {
      this.evento = new Evento()
    }.bind(this), 1)

    this.router.navigate([ 'eventos/novo' ])
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de evento: ${this.evento.tipoEvento}`)
  } 

}
