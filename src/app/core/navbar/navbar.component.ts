import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from './../../seguranca/logout.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //exibindoMenu: boolean

  display;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  customOptions: any = {
    loop: true,
    margin: 0,
    dots: false,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
       items: 1
     },
      400: {
       items: 1
     },
      640: {
       items: 1
     },
     1024: {
       items: 1
     }
    }
  };


}


/*
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  } */
