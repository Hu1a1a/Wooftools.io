import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class BigSwapExplorerService {
  constructor(private api: WoofToolsService, private chain: ChainService) {}
  SwapTable: any;
  async getSwap() {
    const res = await this.api.getSwap();
    if (res) {
      localStorage.setItem('BigSwapExplorerTable', JSON.stringify(res));
    }
    this.SwapTable = localStorage.getItem('BigSwapExplorerTable');
    console.log(this.SwapTable);
    return this.SwapTable;
  }
}
