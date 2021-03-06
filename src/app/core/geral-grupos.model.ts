import { Time } from "@angular/common"

export class Estado {
    codigo: number
    nome: string
    sigla: string
  }

export class Cidade {
  codigo: number
  nome: string
  estado = new Estado()
}

export class Grupo {
    codigo: number
    nome: string 
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cep: string
    diaReuniao: string
    anexo: string
    anexoUrl: string
    cidade = new Cidade()
    contatos = new Array<Contato>()  
      
   /* constructor(nome: string, logradouro: string, numero: string, complemento: string, 
        bairro: string, cep: string,  cidade: Cidade) {
        this.nome = nome
        this.logradouro = logradouro
        this.numero = numero
        this.complemento = complemento
        this.bairro = bairro
        this.cep = cep 
        //this.estado = estado
        this.cidade = cidade     
    } */

  }

  export class Contato {
    codigo: number
    nome: string
    email: string
    telefone: string

    constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
      this.codigo = codigo
      this.nome = nome
      this.email = email
      this.telefone = telefone
    }
  }

  export class Evento {
    codigo: number
    dataEvento: Date
    horaEvento: Time
    grupo = new Grupo()
    tipoEvento: string
    tema: string
    palestrante: string
    destaque: boolean = true
    dataReferencia: Date
  }