import { Injectable } from '@angular/core';

import { MoneyHttp } from '../seguranca/money-http';

import { Cidade } from '../core/geral-grupos.model';
import { HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod'; //<-- assim que estava

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

  buscarPeloCodigo(codigo: number): Promise<Cidade> {
    return this.http.get<any>(`${this.cidadesUrl}/${codigo}`)
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

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams    
    params = params.append('estado', estado)    
   
    return this.http.get<any>(this.cidadesUrl, { params } )
      .toPromise()      
      .then(response => response)
  }

  atualizar(cidade: Cidade, codigo: number): Promise<Cidade> {    
    const body = JSON.stringify(cidade);
    return this.http.put<Cidade>(`${this.cidadesUrl}/${codigo}`, cidade) // body , { headers }
      .toPromise()
      .then(response => response)
  }

  excluir(codigo: number): Promise<void> { 
    return this.http.delete<any>(`${this.cidadesUrl}/${codigo}`  ) 
      .toPromise()
      .then(() => null)
  }


}
