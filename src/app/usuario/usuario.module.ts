import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioAtualizarComponent } from './usuario-atualizar/usuario-atualizar.component';
import { UsuarioRoutingModule } from './usuario-routing.modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuariosPesquisaComponent,
    UsuarioCadastroComponent,
    UsuarioAtualizarComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    PickListModule,
    InputSwitchModule,
    CheckboxModule,

    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
