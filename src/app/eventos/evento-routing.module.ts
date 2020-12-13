import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventosPesquisaComponent } from './eventos-pesquisa/eventos-pesquisa.component';

const routes: Routes = [
  { path: '', component: EventosPesquisaComponent }, 
  { path: 'novo', component: EventoCadastroComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
