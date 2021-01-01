import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Evento } from '../core/geral-grupos.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  eventosHomeUrl: string

  constructor(private http: HttpClient) {
    this.eventosHomeUrl = `${environment.apiUrl}/home/nav-eventos`
   }

   /*
   public getEventos(): Promise<any[]> {
    return this.http.get<any>(`${this.eventosHomeUrl}?resumo&destaque=true`) // apresenta apenas os eventos na home
      .toPromise()
      .then((resposta) => resposta)
  } */

  public getEventos(): Observable<Evento[]> {
    return this.http.get<any>(`${this.eventosHomeUrl}?resumo&destaque=true`) // apresenta apenas os eventos na home
    .pipe(
      retry(30),
      map((resposta) => resposta)   
    ) 
  }

}
