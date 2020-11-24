export class Pessoa {
  codigo: number
  nome: string
  endereco = new Endereco()
  ativo: boolean = true
}

export class Endereco {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  telefone: string
  cidade: string
  encargo: string
}

export class Categoria {
  codigo: number
  nome: string
}

export class Lancamento {
  codigo: number
  tipo: string = 'RECEITA'
  descricao: string
  dataVencimento: Date
  dataPagamento: Date
  valor: number
  observacao: string
  pessoa = new Pessoa()
  categoria = new Categoria()
}

