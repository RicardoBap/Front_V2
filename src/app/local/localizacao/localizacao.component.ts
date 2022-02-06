import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-localizacao',
  template: `
  <div class="container">
    <div class="ui-g">

      <div class="p-col-12">
        <h3 style="margin-top: 80px;">Localização</h3>
      </div>

      <!-- width="1200" height="400" -->
      <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5196.925233067139!2d-47.08195156929406!3d-22.921444448418516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c91103ac1d29%3A0x7a66d2f5f456dd31!2sAlcoolicos%20Anonimos%20-%20Grupo%20Salva%20vidas!5e0!3m2!1spt-BR!2sbr!4v1602781151112!5m2!1spt-BR!2sbr"
        
        frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
      </iframe>

    </div>
  </div>
  <app-rodape></app-rodape>
  `,
  styles: [`
   h3 {
    color: #101215;
    font-family: 'Fira Sans', sans-serif;
    font-size: 36px;
    line-height: 120%;
  }

  @media screen and (max-width: 960px) {
    h3 {
      font-family: 'Fira Sans', sans-serif;
      font-size: 24px;
      line-height: 120%;
    }
  }

  iframe {
    width: 1200px;
    height: 70vh;
    margin-bottom: 128px;   
  }
  @media screen and (max-width: 960px) {
    iframe {
      max-width: 720px;
    }
  }
  @media screen and (max-width: 720px) {
    iframe {
      max-width: 480px;
    }
  }
  @media screen and (max-width: 480px) {
    iframe {
      max-width: 420px;
    }
  }
  @media screen and (max-width: 420px) {
    iframe {
      max-width: 400px;
    }
  }
  @media screen and (max-width: 320px) {
    iframe {
      max-width: 280px;
    }
  }
  `
  ] 
})
export class LocalizacaoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Localização')
  }

}
