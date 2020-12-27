import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosHomeComponent } from './home/eventos-home/eventos-home.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
    children: [
      { path: '', component: EventosHomeComponent },
      { path: 'eventos/nav-eventos', component: EventosHomeComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
