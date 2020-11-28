import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Grupo } from '../../core/geral-grupos.model';
import { GeralGruposService } from '../geral-grupos.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css']
})
export class GrupoCadastroComponent implements OnInit { 

  grupo = new Grupo()
  estados: any[]
  cidades: any[]
  estadoSelecionado: number
  cidadeLoading: boolean = false
  

  constructor(   
    private geralGruposService: GeralGruposService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
   ) { }

   ngOnInit(): void {
    const codigoGrupo = this.route.snapshot.params['codigo']
    
    this.title.setTitle('Novo grupo')

    this.carregarEstados()

    if(codigoGrupo) {      
      this.carregarGrupo(codigoGrupo)
    }
  }

  get atualizando() {
    return Boolean(this.grupo.codigo)
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de grupo: ${this.grupo.nome}`)
  } 
 
  carregarEstados() {
    this.geralGruposService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => (
          { label: uf.nome, value: uf.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  carregarCidades() {
    this.cidadeLoading = true 
    this.geralGruposService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {  
        this.cidadeLoading = false    
        this.cidades = lista.map(c => (
          { label: c.nome, value: c.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro))
  } 

  carregarGrupo(codigo: number) {    
    this.geralGruposService.buscarPeloCodigo(codigo)
      .then(grupo => {
        this.grupo = grupo

        this.estadoSelecionado = (this.grupo.cidade) ? this.grupo.cidade.estado.codigo : null
        if (this.estadoSelecionado) {
          this.carregarCidades()
        }

      this.atualizarTitulo() // <----- TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(grupoForm: NgForm) {
    if (this.atualizando) {
      this.atualizarGrupo(this.grupo.codigo)
    } else {
      this.adicionarGrupo(grupoForm)
    }
  }  

  adicionarGrupo(grupoForm: NgForm) {  
    //console.log(this.grupo) 
    this.geralGruposService.adicionar(this.grupo)
    .then(grupoAdicionado => {
      this.messageService.add(
        {severity:'success', summary:'Service Message', detail:'Grupo adicionado com sucesso!'});

      this.router.navigate([ '/grupos/', grupoAdicionado.codigo ])     
    } ) 
  .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarGrupo(codigo) {
    this.geralGruposService.atualizar(this.grupo, codigo)
    .then(grupo => {
      this.grupo = grupo

      this.messageService.add(
        {severity:'success', summary:'Service Message', detail:'Grupo atualizada com sucesso!'});
      this.atualizarTitulo() // <---- TITULO
    })
    .catch(erro => this.errorHandler.handle(erro))
  }  

  novo(grupoForm: NgForm) {
    grupoForm.reset()

    setTimeout(function() {
      this.grupo = new Grupo()
    }.bind(this), 1)

    this.router.navigate([ 'grupos/novo' ])
  }

   
  
} 




/*

  formulario: FormGroup
  grupo: Grupos
  estados: any[]
  cidades: any[]
  estadoSelecionado: number

  constructor(
    private formBuilder: FormBuilder,
    private geralGruposService: GeralGruposService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.criarFormularioCadastroGrupo()
    this.carregarEstados()    
    
    const codigoGrupo = this.route.snapshot.params['codigo']
    if(codigoGrupo) {
      this.carregarGrupo(codigoGrupo)
    }   
    
    this.title.setTitle('Novo grupo')
  } 

  criarFormularioCadastroGrupo() {
    this.formulario = this.formBuilder.group({
      'codigo': [],
      'nome': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(30) ]),
      'logradouro': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ]),
      'numero': new FormControl(null, [ Validators.required, Validators.maxLength(10) ]),
      'complemento': [],
      'bairro': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]),
      'cep': [],      
      'cidade': this.formBuilder.group({
        'codigo': new FormControl(null, [ Validators.required ]),
        'nome': [],
      }),
      'estado': this.formBuilder.group({
        'codigo': new FormControl(null, [ Validators.required ]),
        'nome': []
      })
    }) 
  } 
  
  carregarEstados() {
    this.geralGruposService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => (
          { label: uf.nome, value: uf.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  carregarCidades() {
    this.geralGruposService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {
        //console.log(this.cidades)
        this.cidades = lista.map(c => (
          { label: c.nome, value: c.codigo }))
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  salvar() {
    if (this.atualizando) {
      this.atualizarGrupo()
    } else {
      this.adicionarGrupo()
    }
  }

  get atualizando() {
    return Boolean(this.formulario.get('codigo').value)
  }

  public adicionarGrupo(): void {    
    if (this.formulario.status === 'INVALID') {
      console.log(this.formulario)
      
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('logradouro').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento')
      this.formulario.get('bairro').markAsTouched()
      this.formulario.get('cep')
      this.formulario.get('cidade').markAsTouched()
      this.formulario.get('estado').markAsTouched()

    } else {      
      let grupo = new Grupos (
        this.formulario.value.nome,
        this.formulario.value.logradouro,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.bairro,
        this.formulario.value.cep,
        this.formulario.value.estado,
        this.formulario.value.cidade
      ) 

      //console.log(grupo)
      console.log('Formulário está válido')

      this.geralGruposService.adicionar(this.formulario.value)         
      .then(() => {
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Grupo adicionado com sucesso!'});
  
      } )
    } 
  }  

  public atualizarGrupo(): void {    
    if (this.formulario.status === 'INVALID') {
      console.log(this.formulario)
      
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('logradouro').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento')
      this.formulario.get('bairro').markAsTouched()
      this.formulario.get('cep')
      this.formulario.get('cidade').markAsTouched()
      this.formulario.get('estado').markAsTouched()

    } else {      
      let grupo = new Grupos (
        this.formulario.value.nome,
        this.formulario.value.logradouro,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.bairro,
        this.formulario.value.cep,
        this.formulario.value.estado,
        this.formulario.value.cidade
      ) 

      //console.log(grupo)
      console.log('Formulário está válido')

      this.geralGruposService.atualizar(this.formulario.value)
      .then(grupo => {
        this.grupo = grupo
        this.formulario.patchValue(grupo) // <---- patchValue TROCAR
  
        this.messageService.add(
          {severity:'success', summary:'Service Message', detail:'Grupo atualizado com sucesso!'});
        this.atualizarTitulo() // <---- TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))     
    } 
  } 

  carregarGrupo(codigo: number) {
    this.geralGruposService.buscarPeloCodigo(codigo)
      .then(grupo => {
        //this.pessoa = pessoa
        this.formulario.patchValue(grupo) // <---- patchValue TROCAR   

        this.estadoSelecionado = (this.grupo.cidade) ? this.grupo.cidade.estado.codigo : null
        if (this.estadoSelecionado) {
          this.carregarCidades()
        }
        
      this.atualizarTitulo() // <----- TITULO
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo() {
    this.formulario.reset()

    setTimeout(function() {
      this.grupo = new Grupos(
        this.formulario.value.nome,
        this.formulario.value.logradouro,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.bairro,
        this.formulario.value.cep,
        this.formulario.value.estado,
        this.formulario.value.cidade 
      )
    }.bind(this), 1)

    this.router.navigate([ '/grupos/novo' ])
  }

  atualizarTitulo() {
    this.title.setTitle(`Atualização de pessoa: ${this.formulario.get('descricao').value}`)
  }

} */
  
  /*
  public salvar(): void {    
    if (this.formulario.status === 'INVALID') {
      console.log(this.formulario)
      
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('logradouro').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento')
      this.formulario.get('bairro').markAsTouched()
      this.formulario.get('cep')
      this.formulario.get('cidade').markAsTouched()
      this.formulario.get('estado').markAsTouched()

    } else {      
      let novoGrupo = new Grupos (
        this.formulario.value.nome,
        this.formulario.value.logradouro,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.bairro,
        this.formulario.value.cep,
        this.formulario.value.cidade       
      ) 

      console.log(novoGrupo)
      console.log('Formulário está válido')

      this.geralGruposService.adicionar(this.formulario.value)         
        .then(() => {
          novoGrupo = novoGrupo
          console.log(novoGrupo.codigo)
        })
    } 
  }
  
  */


