import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
  <div class="container">

    <div class="linha  row">
     
      <div class="p-grid  p-justify-center">
        <h1><i class="pi pi-lock"></i></h1>
      </div>

      <div class="p-grid  p-justify-center">
        <h2>Acesso negado</h2>
      </div>

      <div class="p-col-12">
        <p>Desculpe, você não está autorizado a acessar a página que solicitou.<br/>
        Se você acha que isso é um engano, entre em contato com a gente.</p>        
      </div>

      <div class="p-grid  p-justify-center">
        <a pButton routerLink="/lancamentos" label="Voltar para pesquisa de lançamentos"> </a>
      </div>     
      
    </div> 

  </div>
  `,
  styles: [`
    i {
      font-size: 2em;
    }

    .linha {
      margin-top: 50px;
    }

    p {
      text-align: center;
    }  
  `
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

/*
<div class="container">
    <div class="ui-g">
      <h1 class="text-center">Acesso negado!</h1>
    </div>

    <div>
      <h1><i class="pi pi-lock" style="font-size: 3em"></i></h1>
    </div>
  </div>
*/