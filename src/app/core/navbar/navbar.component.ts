import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject, of } from 'rxjs';
import { switchMap,  debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from './../../seguranca/logout.service';
import { HomeGruposService } from 'src/app/home-grupos/home-grupos.service';
import { Grupo } from '../geral-grupos.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ HomeGruposService ]
})
export class NavbarComponent implements OnInit {
  
  //exibindoMenu: boolean

  display;

  public grupos: Observable<Grupo[]>
  //public grupos2: Grupo[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private homeGrupoService: HomeGruposService,
    private route: ActivatedRoute // <------------Pesquisa  
    ) { }   

  ngOnInit(): void {
    
    this.grupos = this.subjectPesquisa
      .pipe(        
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => { 
          //console.log('requisicao http para a api')
          if(termo.trim() === '') {
            return of<Grupo[]>([])
          }           
          return this.homeGrupoService.pesquisaGrupos(termo)
        })                    
      ) 
      catchError((erro: Grupo[]) => {
        //console.log(erro)
        return of<Grupo[]>([])
      })       
  } 

  public pesquisa(termoDaBusca: string): void {
    //console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  } 


  criarNovoAccessToken() {
    console.log('Obtendo novo acess token atraves do botao')
    this.auth.obterNovoAccessToken()
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate([ '/home' ])
      })
      .catch(erro => this.errorHandler.handle(erro))
  }  

}
