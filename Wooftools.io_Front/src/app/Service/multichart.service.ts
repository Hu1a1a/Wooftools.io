import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class MultiChartService {
  constructor(private api: WoofToolsService, private chain: ChainService) {}
  ChartTable: any;
  HotPairs: any;
  async getHotpairs() {
    const res = await this.api.getShared('Hotpairs', '', '');
    return res.data;
  }
}
