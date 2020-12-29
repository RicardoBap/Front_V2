import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  eventosUrl: string

  constructor(private http: HttpClient) {
    this.eventosUrl = `${environment.apiUrl}/home/nav-eventos`
   }

   public getEventos(): Promise<any[]> {
    return this.http.get<any>(`${this.eventosUrl}?resumo&destaque=true`) // apresenta apenas as cidadees de campinas
      .toPromise()
      .then((resposta) => resposta)
  }

}
