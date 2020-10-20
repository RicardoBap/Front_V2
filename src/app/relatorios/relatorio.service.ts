import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';

import { MoneyHttp } from './../seguranca/money-http';
import * as moment from 'moment';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod'; //<---- assim que estava

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  lancamentorUrl: string

  constructor(
    private http: MoneyHttp
  ) { this.lancamentorUrl = `${environment.apiUrl}/lancamentos` }


  relatorioLancamentosDiario(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .append('inicio',
        moment(inicio).format('YYYY-MM-DD'))
      .append('fim',
        moment(fim).format('YYYY-MM-DD'))

    return this.http.get<any>(`${this.lancamentorUrl}/relatorios/tesouraria`, { params, responseType: 'blob' } )
      .toPromise()
      .then(response => response)

  }

  relatorioPorPessoa(inicio: Date, fim: Date)  {
    const params = new HttpParams()
      .append('inicio',
        moment(inicio).format('YYYY-MM-DD'))
      .append('fim',
        moment(fim).format('YYYY-MM-DD'))

    return this.http.get<any>(`${this.lancamentorUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' } )
      .toPromise()
      .then(response => response )
  }

}
