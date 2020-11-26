import { Injectable } from '@angular/core';

import { MoneyHttp } from '../seguranca/money-http';

import { environment } from 'src/environments/environment.prod';
import { Cidade } from '../core/geral-grupos.model';
import { HttpParams } from '@angular/common/http';

export class CidadeFiltro {
  estado: string
  nome: string
  pagina = 0
  itensPorPagina = 10
}

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  estadosUrl: string
  cidadesUrl: string

  constructor(
    private http: MoneyHttp
  ) { 
    this.estadosUrl = `${environment.apiUrl}/estados`
    this.cidadesUrl = `${environment.apiUrl}/cidades`
  }

  listarEstados(): Promise<any> {
    return this.http.get<any>(`${this.estadosUrl}`)
    .toPromise()
  }

  /*
  salvar(cidade: Cidade): Observable<any> {
    //console.log(cidade)
    return this.http.post<any>(`${this.cidadesUrl}`, cidade )
      .pipe(resposta => resposta)
  } */

  public adicionar(cidade: Cidade): Promise<Cidade> {    
    return this.http.post<any>(`${this.cidadesUrl}`, cidade)
      .toPromise()
  }

  pesquisar(filtro: CidadeFiltro): Promise<any> {
    //console.log(filtro)      
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),        
        size: filtro.itensPorPagina.toString() 
      }
    })

    if(filtro.estado) {
      params = params.append('estado', filtro.estado)
    }
    if(filtro.nome) {
      params = params.append('nome', filtro.nome)      
    }   

    return this.http.get<any>(`${this.cidadesUrl}?resumo`, { params }) 
    .toPromise()
    .then(response => {
      //console.log(response) //<------- OK
      const cidades = response.content     
      
      const resultado = {
        cidades: cidades,
        total: response.totalElements
      }
      return resultado
    })
  }



}
