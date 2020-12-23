import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Grupo } from '../core/geral-grupos.model';

import { environment } from 'src/environments/environment.prod'; //<-- assim que estava


@Injectable({
  providedIn: 'root'
})
export class HomeGruposService {

  gruposUrl: string

  constructor(private http: HttpClient) {
      this.gruposUrl = `${environment.apiUrl}/grupos/nav-grupos`      
     }

  public getGrupos(): Promise<Grupo[]> {
    return this.http.get<any>(`${this.gruposUrl}?resumo&cidade=Campinas`) // apresenta apenas as cidadees de campinas
      .toPromise()
      .then((resposta) => resposta)
  }

  public pesquisaGrupos(termo: string): Observable<Grupo[]> {
    return this.http.get<any>(`${this.gruposUrl}?resumo&nome=${termo}`)
    //.pipe((resposta: any) => resposta)    
    .pipe(
      retry(20),
      map((resposta) => resposta)   
    )    
  }

  public getGrupoPeloCodigo(codigo: number) : Promise<Grupo[]> {
    return this.http.get<any>(`http://localhost:8080/grupos/${codigo}`)
      .toPromise()
      .then((resposta: any) => {
        //console.log(resposta)
        return resposta
      })
  }

}
