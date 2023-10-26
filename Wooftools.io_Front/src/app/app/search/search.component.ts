import { Component } from '@angular/core';
import { SearchService } from 'src/app/Service/search.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/Service/chain.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(
    public search: SearchService,
    public priceFormat: PriceFormatService,
    private router: Router,
    private chain: ChainService
  ) {}
  async GetSearchChain(chain: string) {
    this.search.PoolsTable = await this.search.getSearchChain(
      this.search.searchedValue,
      chain
    );
  }
  async selectPair(item: any) {
    this.chain.SelectedChain = this.chain.Chains.findIndex((i: any) => {
      return (
        (i.chainShortName &&
          i.chainShortName.toLowerCase() === item.id.chain.toLowerCase()) ||
        (i.chainShortName2 &&
          i.chainShortName2.toLowerCase() === item.id.chain.toLowerCase()) ||
        (i.chainShortName2 &&
          i.chainShortName3.toLowerCase() === item.id.chain.toLowerCase())
      );
    });
    this.chain.SelectedPair = item.id.pair;
    this.search.searchedValue = '';
    this.router.navigate(['/PairExplorer']);
  }
}
