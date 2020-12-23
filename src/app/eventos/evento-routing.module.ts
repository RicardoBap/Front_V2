import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { EventosPesquisaComponent } from './eventos-pesquisa/eventos-pesquisa.component';

const routes: Routes = [
  { path: '', component: EventosPesquisaComponent }, 
  { path: 'novo', component: EventoCadastroComponent ,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_EVENTO' ] } } ,
  { path: ':codigo', component: EventoCadastroComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_EVENTO' ] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
