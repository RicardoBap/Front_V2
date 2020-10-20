import { Injectable } from '@angular/core';

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod'; //<---- assim que estava

export class PessoasFiltro {
  nome: string
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string; 

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
   }

  pesquisar( filtro: PessoasFiltro ): Promise<any> {    

      let params = new HttpParams({
        fromObject: {
          page: filtro.pagina.toString(),
          size: filtro.itensPorPagina.toString()
        }
      })

      if(filtro.nome) {
        params = params.append('nome', filtro.nome)
      }

    return this.http.get<any>(`${this.pessoasUrl}`, { params } ) 
      .toPromise()
      .then( response => {
        const pessoas = response.content

        const resultado = {
          pessoas: pessoas,
          total: response.totalElements
        }
        return resultado
       })
    }

  excluir(codigo: number): Promise<void> { 
      return this.http.delete<any>(`${this.pessoasUrl}/${codigo}`  ) 
        .toPromise()
        .then(() => null)
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-Type', 'application/json')

      return this.http.put<any>(`${this.pessoasUrl}/${codigo}/ativo`, `${ativo}`, { headers })
      .toPromise()
      .then(() => null)
  }

  listarTodas() {    
      return this.http.get<any>(this.pessoasUrl)  
      .toPromise()
      .then( response =>  response.content )
    }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {   
      return this.http.post<any>(`${this.pessoasUrl}`, pessoa )
        .toPromise()
        .then(response => response)
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {    
      return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`) 
        .toPromise()
        .then(response => {
          const pessoa = response as Pessoa
          return pessoa
        })
  }

  atualizar(pessoa: Pessoa, codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-Type', 'application/json')

      const body = JSON.stringify(pessoa)
      
    return this.http.put<any>(`${this.pessoasUrl}/${codigo}`, body, { headers } )
      .toPromise()
      .then(response => response)
  }

}
