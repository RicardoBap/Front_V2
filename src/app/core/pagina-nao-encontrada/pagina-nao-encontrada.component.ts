import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
  <div class="container">

  <div class="linha  row">
   
    <div class="p-grid  p-justify-center">
      <h1><i class="pi pi-exclamation-triangle"></i></h1>
    </div>

    <div class="p-grid  p-justify-center">
      <h2>Página não encontrada</h2>
    </div>

    <div class="p-col-12">
      <p>Desculpe, a página que você tentou acessar não foi encontrada ou não existe mais.<br/>
      Verifique se a URL está correta ou entre em contato com a gente se precisar de ajuda.</p>        
    </div>

    <div class="p-grid  p-justify-center">
      <a pButton routerLink="/home" label="Voltar para a página inicial"> </a>
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
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
