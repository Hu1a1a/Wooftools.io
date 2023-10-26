import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';

@Injectable({
  providedIn: 'root',
})
export class StatService {
  constructor(private api: WoofToolsService) {}
  async getStats(chain: string, slug: string) {
    const res = await this.api.getPair('Hotpairs', chain, slug);
    return res;
  }
}
