import { Pipe } from '@angular/core';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormat {
    transform(value: number,
        decimalLength: number = 2,
        decimalDelimiter: string = ',',
        chunkLength: number = 3): string {

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
        let num = value.toFixed(Math.max(0, ~~decimalLength));

        return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&');
    }
}