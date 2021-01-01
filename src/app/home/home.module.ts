import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.modules';
import { SharedRodapeModule } from './../shared-rodape/shared-rodape.module';
import { EventosHomeComponent } from './home/eventos-home/eventos-home.component';

@NgModule({
  declarations: [
    HomeComponent,
    EventosHomeComponent
  ],
  imports: [
    CommonModule,
    SharedRodapeModule,
    ProgressSpinnerModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
