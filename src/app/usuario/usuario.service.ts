import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { MoneyHttp } from './../seguranca/money-http';
import { Usuario, Permissao } from './../core/usuario.model';

//import { environment } from './../../environments/environment.prod';
import { environment } from 'src/environments/environment.prod'; //<--- assim que estava

export class UsuarioFiltro {
  nome: string
  pagina = 0
  itensPorPagina = 5
}

@Injectable()
export class UsuarioService {

  usuariosUrl: string;   /* 'http://localhost:8080/usuarios' */
  permissoesUrl: string;  /* 'http://localhost:8080/permissao' */

  constructor(
    private http: MoneyHttp
  ) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`
    this.permissoesUrl = `${environment.apiUrl}/permissao`
  }

  pesquisar( filtro: UsuarioFiltro ): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

      let params = new HttpParams({
        fromObject: {
          page: filtro.pagina.toString(),
          size: filtro.itensPorPagina.toString()
        }
      })

      if(filtro.nome) {
        params = params.append('nome', filtro.nome)
      }

    return this.http.get<any>(`${this.usuariosUrl}`, { headers, params } )
    .toPromise()
    .then( response => {
      const usuarios = response.content
        const resultado = {
          usuarios: usuarios,
          total: response.totalElements
        }
        return resultado
      })
    }

  
  public getPermissoes(): Promise<Array<Permissao>> {
    //console.log(Permissao)
    return this.http.get<Permissao>(`${this.permissoesUrl}`)
      .toPromise()
      .then((resposta: any) => resposta )
  } 

  public adicionar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-Type', 'application/json')

    const body = JSON.stringify(usuario)
    return this.http.post<Usuario>(`${this.usuariosUrl}`, usuario)
      .toPromise()
      .then(response => response)
  }


  buscarPeloCodigo(codigo: number): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`, { headers } )
      .toPromise()
      .then( response => {
        const usuario = response as Usuario
        return usuario
      })
  }

  atualizar(usuario: Usuario, codigo: number): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .append('Content-Type', 'application/json')

      const body = JSON.stringify(usuario)

    return this.http.put<any>(`${this.usuariosUrl}/${codigo}`, body, { headers } )
      .toPromise()
      .then(response => response)
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW46YWRtaW4=')

      return this.http.delete<any>(`${this.usuariosUrl}/${codigo}` , { headers } )
        .toPromise()
        .then(() => null)
  }

}
