import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';

const routes: Routes = [
  { path: '', component: CidadesPesquisaComponent },
  { path: 'nova', component: CidadeCadastroComponent },
  { path: ':codigo', component: CidadeCadastroComponent }
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