import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class LiveNewPairService {
  constructor(private api: WoofToolsService, private chain: ChainService) {}
  PoolsTable: any;
  async getPools() {
    const res = await this.api.getPair(
      'Pools',
      this.chain.Chains[this.chain.SelectedChain].chainShortName3
        ? this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName3.toLowerCase()
        : this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName.toLowerCase(),
      ''
    );
    return res.data.updates;
  }
}
