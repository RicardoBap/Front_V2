import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { GeralGruposRoutingModule } from './geral-grupos-routing.modules';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import { GrupoCadastroContatoComponent } from './grupo-cadastro-contato/grupo-cadastro-contato.component';


@NgModule({
  declarations: [ GruposPesquisaComponent, GrupoCadastroComponent, GrupoCadastroContatoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GeralGruposRoutingModule,   

    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    DropdownModule,
    PanelModule,
    DialogModule
  ]
})
export class GeralGruposModule { }
