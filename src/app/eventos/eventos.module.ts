import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoRoutingModule } from './evento-routing.module';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventosPesquisaComponent } from './eventos-pesquisa/eventos-pesquisa.component';

import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [EventoCadastroComponent, EventosPesquisaComponent],
  imports: [
    CommonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ToggleButtonModule, 
    
    EventoRoutingModule
  ]
})
export class EventosModule { }
