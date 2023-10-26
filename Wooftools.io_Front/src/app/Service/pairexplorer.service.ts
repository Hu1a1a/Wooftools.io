import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class PairExplorerService {
  constructor(private api: WoofToolsService, private chain: ChainService) {}
  PairsTable: any;
  SwapsTable: any;
  async getPairs(type: string) {
    const res = await this.api.getPair(
      type,
      this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase(),
      this.chain.SelectedPair
    );
    return res.data[0];
  }
  async getSwaps(type: string) {
    const res = await this.api.getPair(
      type,
      this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase(),
      this.chain.SelectedPair
    );
    return res.data;
  }
}
