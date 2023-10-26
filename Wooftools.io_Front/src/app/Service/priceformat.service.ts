import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriceFormatService {
  PriceFormat(Price: number) {
    if (Price) {
      let PriceString = Price.toString();
      if (PriceString.split('e').length > 1) {
        PriceString = Price.toFixed(100);
      }
      let Fix = 4;
      if (parseInt(PriceString.split('.')[0]) <= 0)
        for (const number of PriceString.split('.')[1].slice()) {
          if (number == '0') {
            Fix = Fix + 1;
          } else {
            break;
          }
        }
      return Price.toFixed(Fix);
    }
    return;
  }
}
