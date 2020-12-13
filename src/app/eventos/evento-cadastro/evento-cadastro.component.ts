import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { GeralGruposService } from 'src/app/geral-grupos/geral-grupos.service';

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css']
})
export class EventoCadastroComponent implements OnInit {

  checked: boolean = false;
  grupos = []

  constructor(
    private geralGruposService: GeralGruposService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
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

}
