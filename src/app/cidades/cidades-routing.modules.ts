import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  { path: '', component: CidadesPesquisaComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_PESQUISAR_CIDADE' ] } },
  { path: 'nova', component: CidadeCadastroComponent, 
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_CIDADE' ] } },
  { path: ':codigo', component: CidadeCadastroComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_CIDADE' ] } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CidadesRoutingModule { }