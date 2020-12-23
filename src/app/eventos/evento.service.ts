import { Injectable } from '@angular/core';
import { MoneyHttp } from '../seguranca/money-http';

import { Evento } from '../core/geral-grupos.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod'; //<-- assim que estava

export class EventoFiltro {
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventosUrl: string

  constructor(private http: MoneyHttp) {
    this.eventosUrl = `${environment.apiUrl}/eventos`
   }

  pesquisar( filtro: EventoFiltro ): Promise<any> {    

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    })  

  return this.http.get<any>(`${this.eventosUrl}?resumo`, { params } ) 
    .toPromise()
    .then( response => {
      const eventos = response.content

      const resultado = {
        eventos: eventos,
        total: response.totalElements
      }
      //console.log(resultado)
      return resultado
     })
  }

  public adicionar(evento: Evento): Promise<Evento> {
    return this.http.post<Evento>(`${this.eventosUrl}`, evento )
      .toPromise()
  }

  
  buscarPeloCodigo(codigo: number): Promise<Evento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    return this.http.get<Evento>(`${this.eventosUrl}/${codigo}`, { headers } )
      .toPromise()
      .then( response => {
        const evento = response //as Lancamento
        return evento
      })
  } 

  atualizar(evento: Evento, codigo: number): Promise<Evento> {  

    const body = JSON.stringify(evento);

    return this.http.put<Evento>(`${this.eventosUrl}/${codigo}`, evento) 
      .toPromise()
      .then(response => response)
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete<any>(`${this.eventosUrl}/${codigo}`) //, { headers }
      .toPromise()
      .then(() => null)
  }


}
