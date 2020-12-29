import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  eventosHomeUrl: string

  constructor(private http: HttpClient) {
    this.eventosHomeUrl = `${environment.apiUrl}/home/nav-eventos`
   }

   public getEventos(): Promise<any[]> {
    return this.http.get<any>(`${this.eventosHomeUrl}?resumo&destaque=true`) // apresenta apenas os eventos na home
      .toPromise()
      .then((resposta) => resposta)
  }

}
