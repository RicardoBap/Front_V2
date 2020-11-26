import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';
import { CidadesRoutingModule } from './cidades-routing.modules';

@NgModule({
  declarations: [CidadeCadastroComponent, CidadesPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,

    CidadesRoutingModule
  ]
})
export class CidadesModule { }
