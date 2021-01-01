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
      this.gruposUrl = `${environment.apiUrl}/grupos`      
     }

  public getGrupos(): Promise<Grupo[]> {
    return this.http.get<any>(`${this.gruposUrl}/nav-grupos?resumo&cidade=Campinas`) // apresenta apenas as cidadees de campinas
      .toPromise()
      .then((resposta) => resposta)
  }

  public pesquisaGrupos(termo: string): Observable<Grupo[]> {
    return this.http.get<any>(`${this.gruposUrl}/nav-grupos?resumo&nome=${termo}`)  // nome_like=
    //.pipe((resposta: any) => resposta)    
    .pipe(
      retry(20),
      map((resposta) => resposta)   
    )    
  }

  public getGrupoPeloCodigo(codigo: number) : Promise<Grupo[]> {
    return this.http.get<any>(`${this.gruposUrl}/${codigo}`)  // http://localhost:8080/grupos/${codigo}
      .toPromise()
      .then((resposta: any) => {
        //console.log(resposta)
        return resposta
      })
  }

}
