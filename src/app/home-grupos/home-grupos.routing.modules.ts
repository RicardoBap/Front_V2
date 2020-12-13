import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavegacaoGruposComponent } from './navegacao-grupos/navegacao-grupos.component';
import { NavegacaoPesquisaComponent } from './navegacao-pesquisa/navegacao-pesquisa.component';


const routes: Routes = [
  { path: '', component:  NavegacaoGruposComponent },
  { path: ':codigo', component:  NavegacaoPesquisaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeGruposRoutingModule { }