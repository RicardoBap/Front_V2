import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment.prod'; // <--- assim que  estava
//import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;   /* 'http://localhost:8080/oauth/token' */
  jwtPayLoad: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService)
  {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`
    this.carregarToken()
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')

    const body = `username=${usuario}&password=${senha}&grant_type=password`

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        //console.log(response)
        this.armazenarToken(response.access_token)
      })
      .catch(response => {
        //console.log(response)
        if (response.status === 400 || response.error === 'invalid_grant') {
          const responseJson = response
          return Promise.reject('Usuario ou senha inválidos')
        }
        return Promise.reject(response)
      })
  }

  limparAccessToken() {
    localStorage.removeItem('token')
    this.jwtPayLoad = null
  }

  private armazenarToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token)
    localStorage.setItem('token', token)
  }

  private carregarToken() {
    const token = localStorage.getItem('token')

    if (token) {
      this.armazenarToken(token)
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao)
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')

    const body = 'grant_type=refresh_token'

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token)

        console.log('Novo access token criado.')
        return Promise.resolve(null)
      })
      .catch(response => {
        console.error('Erro ao renovar token', response)
        return Promise.resolve(null)
      })
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token')

    return !token || this.jwtHelper.isTokenExpired(token)
  }

  temQualquerPermissao(roles) {
    for(const role of roles) {
      if (this.temPermissao(role)) {
        return true
      }
    }
    return false
  }


}
