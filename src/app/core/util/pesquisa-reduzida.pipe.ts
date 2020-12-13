import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pesquisaReduzida'
})
export class PesquisaReduzida implements PipeTransform {

    transform(texto: string, truncarEm: number, iniciarEm: number): string {
        if(texto.length > truncarEm) {
            return texto.substr(iniciarEm, truncarEm) + '...'
        }
        return texto
    }
}