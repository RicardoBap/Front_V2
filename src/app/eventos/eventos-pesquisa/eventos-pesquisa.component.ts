import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { EventoService, EventoFiltro } from '../evento.service';

@Component({
  selector: 'app-eventos-pesquisa',
  templateUrl: './eventos-pesquisa.component.html',
  styleUrls: ['./eventos-pesquisa.component.css']
})
export class EventosPesquisaComponent implements OnInit {
  
  totalRegistros = 0
  filtro = new EventoFiltro()
  eventos = []
  @ViewChild('tabela') grid
  
    constructor(
      private eventoService: EventoService,
      private errorHandler: ErrorHandlerService,
      private messageService: MessageService,
      private confirmation: ConfirmationService,
      private title: Title,
      public auth: AuthService
      ) { }

    ngOnInit() {
      this.title.setTitle('Pesquisa de eventos')  
      this.pesquisar()     
    }

    pesquisar(pagina = 0) {
      this.filtro.pagina = pagina
  
      this.eventoService.pesquisar(this.filtro)      
        .then(resultado => {
          this.totalRegistros = resultado.total
          this.eventos = resultado.eventos
          //console.log(this.eventos)
        })
        .catch(erro => this.errorHandler.handle(erro))
    }

    confirmarExclusao(evento: any) {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(evento)
        }
      })
    }

    excluir(evento: any) {
      this.eventoService.excluir(evento.codigo)        
        .then(() => {          
          this.pesquisar()      
          
          this.messageService.add(
            {severity:'success', summary:'Service Message', detail:'Evento excluído com sucesso!'});
        })
        .catch(erro => this.errorHandler.handle(erro))
    }

    paginador(event) {
      //console.log(event);
        const pagina = event.first / event.rows
        this.pesquisar(pagina)
        //console.log(event.first,"Index of the first record");
        //console.log(event.rows ,"Number of rows to display in new page");
        //console.log(event.page ,"Index of the new page");
        //console.log(event.pageCount,"Total number of pages");      
    } 
    

}
