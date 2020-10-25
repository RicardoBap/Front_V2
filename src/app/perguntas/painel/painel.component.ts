import { NgForm } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';

import { Frase } from '../frase/frase.model';
import { FRASES } from './frases.mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent  {

  public titulo = 'Responda Sim ou Não';

  public frases: Array<Frase> = FRASES;
  public resposta: boolean;
  public limpaResposta: boolean;

  public rodada = 0;
  public rodadaFrase: Frase;

  public positivo = 0;
  public negativo = 0;

  public progresso = 0;

  @Output()
  public encerrar: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  public atualizaResposta(resposta: string): void {
    this.resposta = JSON.parse(resposta);
    //console.log(resposta);
  }

  public verificarResposta(painelForm: NgForm): void {
    //console.log(painelForm)
    if (this.resposta === true) {
      this.positivo = ++this.positivo;
      //console.log('positivo' + this.positivo);
    } else {
      this.negativo = ++this.negativo;
      //console.log('negativo' + this.negativo);
    }

    // trocar pergunta da rodada
    this.rodada++;

    // barra de progresso
    this.progresso = this.progresso + Math.round(110 / this.frases.length);
    if (this.rodada === 12) {
      this.encerrar.emit(this.positivo);
    }
    this.atualizaRodada();
  }

  public atualizaRodada() {
    this.rodadaFrase = this.frases[this.rodada];
    // limpa resposta
    this.resposta = null;
  }

}
