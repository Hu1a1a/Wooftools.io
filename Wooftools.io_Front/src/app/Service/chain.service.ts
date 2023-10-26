import { Injectable } from '@angular/core';
import { WoofToolsService } from './wooftools.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ChainService {
  constructor(private api: WoofToolsService, private router: Router) {}
  Chains: any;
  SelectedChain: string | number = 'ALL CHAINS';
  SelectedPair = '';
  async getChain(): Promise<any> {
    this.Chains = await this.api.getSharedChain();
    if (this.SelectedChain !== 'ALL CHAINS') {
      this.SelectedPair = this.Chains[this.SelectedChain].defaultPair;
    } else {
      this.SelectedPair = '';
    }
    if (this.router.url !== '/WoofBoard') {
      this.SelectedChain = 0;
    }
    return;
  }
}
