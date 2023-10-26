import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';

@Injectable({
  providedIn: 'root',
})
export class MultiSwapService {
  constructor(private api: WoofToolsService) {}
  ExchangeTable: any;
  ChainExchangeTable: any;
  async getExchange() {
    const res = await this.api.getPair('exchange', '', '');
    return res;
  }
}
