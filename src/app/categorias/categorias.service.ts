import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { MoneyHttp } from '../seguranca/money-http';
import { Categoria } from '../core/model';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod'; //<-- assim que estava

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string; /* 'http://localhost:8080/categorias' */

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`
   }

  listarTodas(): Promise<any> {
    return this.http.get<any>( `${this.categoriasUrl}` )
    .toPromise()
  }

  consultar(): Promise<any> {
    return this.http.get<any>( `${this.categoriasUrl}` )  
    .toPromise()
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.http.post<Categoria>(`${this.categoriasUrl}` )
    .toPromise()
    .then(response => response)
  }

  excluir(codigo: number): Promise<Categoria> {
    return this.http.delete<Categoria>(`${this.categoriasUrl}/${codigo}` ) 
    .toPromise()
    .then(() => null)
  }
/************************************************************************* */
  buscarPeloCodigo(codigo: number): Promise<Categoria> {
    return this.http.get<Categoria>(`${this.categoriasUrl}/${codigo}` )  
      .toPromise()
      .then( response => {
        const categoria = response as Categoria

        return categoria
      })
  }

  atualizar(categoria: Categoria, codigo: number): Promise<Categoria> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-type', 'application/json')

      const body = JSON.stringify(categoria);

    return this.http.put<Categoria>(`${this.categoriasUrl}/${codigo}`, body , { headers })
      .toPromise()
      .then(response => response)
  }

}
