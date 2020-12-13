import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavegacaoGruposComponent } from './navegacao-grupos/navegacao-grupos.component';
import { NavegacaoPesquisaComponent } from './navegacao-pesquisa/navegacao-pesquisa.component';
import { HomeGruposRoutingModule } from './home-grupos.routing.modules';
import { SharedRodapeModule } from '../shared-rodape/shared-rodape.module';

import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    NavegacaoGruposComponent,
    NavegacaoPesquisaComponent   
  ],
  imports: [
    CommonModule,
    SharedRodapeModule,
    ButtonModule,

    HomeGruposRoutingModule
  ]
})
export class HomeGruposModule { }
