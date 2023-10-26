import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private api: WoofToolsService, private chain: ChainService) {}
  PoolsTable: any;
  searchedValue = '';

  async getSearch(query: string) {
    const res = await this.api.getQuery(query);
    return res;
  }
  async getSearchChain(query: string, chain: string) {
    const res = await this.api.getQueryChain(query, chain);
    console.log(res);
    return res;
  }
}
