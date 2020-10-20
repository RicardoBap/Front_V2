import { Injectable } from '@angular/core';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'; //npm install rxjs-compat --save
import 'rxjs/add/observable/fromPromise';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}  // <-------------

@Injectable()
export class MoneyHttp extends HttpClient {

  constructor(
    private auth: AuthService,
    private httpHandler: HttpHandler
   ) {
      super(httpHandler)
    }

    public delete<T>(url: string, options?: any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.delete<T>(url, options))
    }

    public patch<T>(url: string, body: any, options?: any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.patch<T>(url, options))
    }

    public head<T>(url: string, options?: any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.head<T>(url, options))
    }

    public options<T>(url: string, options?: any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.options<T>(url, options))
    }

    public get<T>(url: string, options?: any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.get<T>(url, options))
    }

    public post<T>(url: string, options?:any): Observable<T> {
      return this.fazerRequisicao<T>(() => super.post<T>(url, options))
    }

    public put<T>(url: string, body:any, options?: any): Observable<any> {
      return this.fazerRequisicao<T>(() => super.put<T>(url, body, options))
    }

    private fazerRequisicao<T>(fn: Function): Observable<T> {
      if (this.auth.isAccessTokenInvalido()) {
        console.log('Requisição http com access token invalido! Obtendo novo token AQUI')

        const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError()
          }

            return fn().toPromise()
          })

        return Observable.fromPromise(chamadaNovoAccessToken)
      } else {
        return fn()
      }
    }

}


/*

import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class MoneyHttp extends AuthHttp {

  constructor(
    private auth: AuthService,
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions
   ) {
      super(options, http, defOpts)
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.delete(url, options))
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.patch(url, options))
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.head(url, options))
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.options(url, options))
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.get(url, options))
    }

    public post(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.post(url, options))
    }

    public put(url: string, body:any, options?: RequestOptionsArgs): Observable<Response> {
      return this.fazerRequisicao(() => super.put(url, body, options))
    }

    private fazerRequisicao(fn: Function): Observable<Response> {
      if (this.auth.isAccessTokenInvalido()) {
        console.log('Requisição http com access token invalido! Obtendo novo token')

        const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
          .then(() => {
            return fn().toPromise()
          })

        return Observable.fromPromise(chamadaNovoAccessToken)
      } else {
        return fn()
      }
    }
}

*/
