import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventoRoutingModule } from './evento-routing.module';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventosPesquisaComponent } from './eventos-pesquisa/eventos-pesquisa.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [EventoCadastroComponent, EventosPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ToggleButtonModule, 
    ButtonModule,
    PaginatorModule,
    TooltipModule,
    
    SharedModule,
    EventoRoutingModule
  ]
})
export class EventosModule { }
