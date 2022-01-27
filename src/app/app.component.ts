import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './seguranca/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private auth: AuthService) {
  }

  exibindoNavBar() {
    return this.router.url !== '/login'
  }

  exibindoMenu() {
    return this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
  }

}
