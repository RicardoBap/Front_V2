import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Cidade, Estado, Grupo } from '../core/geral-grupos.model';
import { MoneyHttp } from '../seguranca/money-http';

export class GruposFiltro {
  nome: string
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class GeralGruposService {

  gruposUrl: string
  cidadesUrl: string
  estadosUrl: string

  constructor(private http: MoneyHttp) { 
    this.gruposUrl = `${environment.apiUrl}/grupos`
    this.estadosUrl = `${environment.apiUrl}/estados`
    this.cidadesUrl = `${environment.apiUrl}/cidades`
  } 

  pesquisar(filtro: GruposFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    })

    if(filtro.nome) {
      params = params.append('nome', filtro.nome)
    }

  return this.http.get<any>(`${this.gruposUrl}`, { params } ) 
    .toPromise()
    .then( response => {
      const grupos = response.content

      const resultado = {
        grupos: grupos,
        total: response.totalElements        
      }     
      return resultado
     })
  }

  public adicionar(grupo: Grupo): Promise<Grupo> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-Type', 'application/json')

    const body = JSON.stringify(grupo)
    
    return this.http.post<any>(`${this.gruposUrl}`, grupo)
      .toPromise()
      .then(response => response)
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<any>(this.estadosUrl)
      .toPromise()
      .then(response => response)
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams    
    params = params.append('estado', estado)    
   
    return this.http.get<any>(this.cidadesUrl, { params } )
      .toPromise()      
      .then(response => response)
  }

  excluir(codigo: number): Promise<void> { 
    return this.http.delete<any>(`${this.gruposUrl}/${codigo}`  ) 
      .toPromise()
      .then(() => null)
  }

  listarTodas() {    
    return this.http.get<any>(this.gruposUrl)  
    .toPromise()
    .then( response =>  response.content )
  }

  
  buscarPeloCodigo(codigo: number): Promise<Grupo> {     
    return this.http.get<Grupo>(`${this.gruposUrl}/${codigo}`) 
      .toPromise()
      .then(response => {
        console.log(response)
        const grupo = response as Grupo
        return grupo
      })
  }

  atualizar(grupo: Grupo, codigo: number): Promise<Grupo> { 
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
    .append('Content-Type', 'application/json')

    const body = JSON.stringify(grupo)
    
  return this.http.put<any>(`${this.gruposUrl}/${codigo}`, body, { headers } )
    .toPromise()
    .then(response => response)
  } 

  /*
  atualizar(grupo: Grupo): Promise<Grupo> {
    return this.http.put(`${this.gruposUrl}/${grupo.codigo}`, JSON.stringify(grupo))
      .toPromise()
      .then(response => 
        response as Grupo
      )
  }

  buscarPeloCodigo(codigo: number): Promise<Grupo> {
    return this.http.get(`${this.gruposUrl}/${codigo}`)
      .toPromise()
      .then(response => 
        response as Grupo  
      )
  } */

 

}
