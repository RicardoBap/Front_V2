import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';


import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';


const routes: Routes = [
  { path: '', component: GruposPesquisaComponent },  
  { path: 'novo', component: GrupoCadastroComponent },
  { path: ':codigo', component: GrupoCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeralGruposRoutingModule { }