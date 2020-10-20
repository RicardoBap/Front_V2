import { Injectable } from '@angular/core';

import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod';  //<--- assim que estava

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;  /* 'http://localhost:8080/tokens/revoke' */

  constructor(
    private http: MoneyHttp,
    private auth: AuthService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken()
      })
  }
}
