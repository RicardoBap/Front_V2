import { Injectable } from '@angular/core';
import { MoneyHttp } from '../seguranca/money-http';

import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventosUrl: string

  constructor(private http: MoneyHttp) {
    this.eventosUrl = `${environment.apiUrl}/eventos`
   }

   public getEventos(): Promise<any[]> {
    return this.http.get<any>(`${this.eventosUrl}?resumo`) // apresenta apenas as cidadees de campinas
      .toPromise()
      .then((resposta) => resposta)
  }
}
