import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Lancamento } from './../core/model';

import * as moment from 'moment'
import { MoneyHttp } from '../seguranca/money-http';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod'; //<--------Assin que estava

export class LancamentoFiltro {
  descricao: string
  dataVencimentoInicio: Date
  dataVencimentoFim: Date
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string /* 'http://localhost:8080/lancamentos' */

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
   }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    //const headers = new HttpHeaders()
    //.append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),        //params = params.set('page', filtro.pagina.toString())
        size: filtro.itensPorPagina.toString() //params = params.set('size', filtro.itensPorPagina.toString())
      }
    })

    if(filtro.descricao) {
      params = params.append('descricao', filtro.descricao)
    }
    if(filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
    }
    if(filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'))
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params }) // { headers, params }
    .toPromise()
    .then(response => {
      const lancamentos = response.content

      const resultado = {
        lancamentos: lancamentos,
        total: response.totalElements
      }
      return resultado
    })
  }

  excluir(codigo: number): Promise<void> {
    //const headers = new HttpHeaders()
      //.append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    return this.http.delete<any>(`${this.lancamentosUrl}/${codigo}`) //, { headers }
      .toPromise()
      .then(() => null)
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    //const headers = new HttpHeaders()
      //.append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      //.append('Content-type', 'application/json')

      //const body = JSON.stringify(lancamento);

    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento )
      .toPromise()
      //.then(response => response)
  }

  buscarPeloCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers } )
      .toPromise()
      .then( response => {
        const lancamento = response //as Lancamento
        //this.converterStringParaData(lancamento)
        return lancamento
      })
  }

  atualizar(lancamento: Lancamento, codigo: number): Promise<Lancamento> {
    //const headers = new HttpHeaders()
      //.append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      //.append('Content-type', 'application/json')

    const body = JSON.stringify(lancamento);

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${codigo}`, lancamento) // body , { headers }
      .toPromise()
      .then(response => response)
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = moment(lancamento.dataPagamento,
        'YYYY-MM-DD').toDate();
    }
    }
  }

}
