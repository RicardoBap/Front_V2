import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.modules';
import { SharedRodapeModule } from './../shared-rodape/shared-rodape.module';
import { EventosHomeComponent } from './home/eventos-home/eventos-home.component';
import { HeroHomeComponent } from './home/hero-home/hero-home.component';

@NgModule({
  declarations: [
    HomeComponent,
    EventosHomeComponent,
    HeroHomeComponent
  ],
  imports: [
    CommonModule,
    SharedRodapeModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
