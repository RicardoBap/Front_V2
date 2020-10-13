import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { SegurancaModule } from './../seguranca/seguranca.module';
import { RouterModule } from '@angular/router';

import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatorioService } from './../relatorios/relatorio.service';

import { SegurancaRoutingModule } from './../seguranca/seguranca-routing.module';
import { MoneyHttp } from './../seguranca/money-http';

import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { FooterComponent } from './footer/footer.component';

import { CarouselModule } from 'ngx-owl-carousel-o';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    CarouselModule,

    SegurancaRoutingModule,

    SegurancaModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    Title,
    MessageService,
    AuthService,
    JwtHelperService,
    MoneyHttp,
    DashboardService,
    RelatorioService,

    { provide: LOCALE_ID, useValue: 'pt' }
  ],

})
export class CoreModule { }
