import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WoofBoardService {
  constructor(
    private api: WoofToolsService,
    private chain: ChainService,
    private router: Router
  ) {}
  table: any;
  table2: any;
  selectTable = 'Pairs';
  interval = '24h';
  dailyGainers: any;
  dailyLosers: any;
  hotPairs: any;
  recentUpdated: any;
  currentStats: any;
  headerCoinValue = 0;

  async getTable() {
    const chain =
      this.chain.SelectedChain == 'ALL CHAINS'
        ? ''
        : this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName.toLowerCase();
    const res = await this.api.getShared(
      this.selectTable,
      chain,
      this.interval
    );
    this.table = res.data;
  }

  async getAllTable() {
    let chain = '';
    if (this.chain.SelectedChain === 'ALL CHAINS') {
      if (this.router.url !== '/WoofBoard') {
        chain = 'ether';
      }
      this.chain.SelectedPair = '';
    } else {
      chain =
        this.chain.Chains[
          this.chain.SelectedChain
        ].chainShortName.toLowerCase();
      this.chain.SelectedPair =
        this.chain.Chains[this.chain.SelectedChain].defaultPair;
    }
    this.table = await this.get(this.selectTable, chain, this.interval);
    this.table2 = await this.get(this.selectTable, chain, this.interval);
    this.dailyGainers = await this.get('Gainers', chain, '24h');
    this.dailyLosers = await this.get('Losers', chain, '24h');
    this.hotPairs = await this.get('Pairs', chain, '24h');
    this.recentUpdated = await this.get('Updated', chain, '24h');
    this.currentStats = await this.get('Stats', chain, '24h');
  }

  async get(string: string, chain: string, Interval: string) {
    const res = await this.api.getShared(string, chain, Interval);
    return res.data;
  }
}
