import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-localizacao',
  template: `
  <div class="container">
    <div class="ui-g">

      <div class="p-col-12">
        <h1 style="margin-top: 132px;">Localização</h1>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5196.925233067139!2d-47.08195156929406!3d-22.921444448418516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c91103ac1d29%3A0x7a66d2f5f456dd31!2sAlcoolicos%20Anonimos%20-%20Grupo%20Salva%20vidas!5e0!3m2!1spt-BR!2sbr!4v1602781151112!5m2!1spt-BR!2sbr"
        width="1200" height="400"
        frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
      </iframe>

    </div>
  </div>
  <app-rodape></app-rodape>
  `
})
export class LocalizacaoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Localização')
  }

}
/*
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10393.682760468748!2d-47.087113120913564!3d-22.923630599128405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c88bd87e3735%3A0x8b06d57bc5802aae!2sGrupo%20Nova%20Vis%C3%A3o%20NA!5e0!3m2!1spt-PT!2sbr!4v1602416149278!5m2!1spt-PT!2sbr"
width="1200" height="400"
frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
</iframe>
*/
