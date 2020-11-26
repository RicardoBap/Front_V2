import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contato } from 'src/app/core/geral-grupos.model';

@Component({
  selector: 'app-grupo-cadastro-contato',
  templateUrl: './grupo-cadastro-contato.component.html',
  styleUrls: ['./grupo-cadastro-contato.component.css']
})
export class GrupoCadastroContatoComponent implements OnInit {

  @Input()
  contatos: Array<Contato>

  contato: Contato
  exibindoFormularioContato = false
  contatoIndex: number

  constructor() { }

  ngOnInit(): void {
  }

  get editando() {
    return this.contato && this.contato.codigo
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true
    this.contato = new Contato()
    this.contatoIndex = this.contatos.length
  }

  confirmarContato(formContato: NgForm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato)
    //this.grupo.contatos.push(this.clonarContato(this.contato))
    this.exibindoFormularioContato = false
    formContato.reset()
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1)
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone)
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato)
    this.exibindoFormularioContato = true
    this.contatoIndex = index
  }

}
