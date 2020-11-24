import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado/nao-autorizado.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.LancamentosModule)  },
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule) },

  { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule ) },
  { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },

  { path: 'grupos', loadChildren: () => import('./geral-grupos/geral-grupos.module').then(m => m.GeralGruposModule)  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'perguntas', loadChildren: () => import('./perguntas/perguntas.module').then(m => m.PerguntasModule) },
  { path: 'passos', loadChildren: () => import('./dozepassos/dozepassos.module').then(m => m.DozepassosModule) },
  { path: 'salvavidas', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule) },
  { path: 'localizacao', loadChildren: () => import('./local/local.module').then(m => m.LocalModule) },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })
    ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
