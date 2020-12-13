import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';

import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';

const routes: Routes = [
  { path: '', component: GruposPesquisaComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_PESQUISAR_GRUPO' ] } }, 
  { path: 'novo', component: GrupoCadastroComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_GRUPO' ] } },
  { path: ':codigo', component: GrupoCadastroComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_GRUPO' ] } } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeralGruposRoutingModule { }