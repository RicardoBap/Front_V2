import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioAtualizarComponent } from './usuario-atualizar/usuario-atualizar.component';


const routes: Routes = [
  { path: '', component: UsuariosPesquisaComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_PESQUISAR_USUARIO' ] } },

  { path: 'novo', component:  UsuarioCadastroComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_USUARIO' ] } },

  { path: ':codigo', component:  UsuarioAtualizarComponent,
    canActivate: [ AuthGuard ], data: { roles: [ 'ROLE_CADASTRAR_USUARIO' ] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
