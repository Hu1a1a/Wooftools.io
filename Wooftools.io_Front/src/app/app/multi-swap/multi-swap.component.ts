import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/Service/chain.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { PairExplorerService } from 'src/app/Service/pairexplorer.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
import { LiveNewPairService } from 'src/app/Service/livenewpair.service';
import { SearchService } from 'src/app/Service/search.service';
import { MultiSwapService } from 'src/app/Service/multiswapservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-swap',
  templateUrl: './multi-swap.component.html',
  styleUrls: ['./multi-swap.component.css'],
})
export class MultiSwapComponent implements OnInit {
  constructor(
    public chain: ChainService,
    public board: WoofBoardService,
    public pair: PairExplorerService,
    public priceFormat: PriceFormatService,
    public live: LiveNewPairService,
    public search: SearchService,
    private router: Router,
    public swap: MultiSwapService
  ) {}
  SelectTableSize = '3';
  SwapSearch = '';
  SwapTable: any;
  SelectedChain: Array<any> = [];
  async ngOnInit() {
    if (this.chain.SelectedChain === 'ALL CHAINS') {
      this.chain.SelectedChain = 0;
      await this.chain.getChain();
    }
    this.board.hotPairs = await this.board.get(
      'Pairs',
      this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase(),
      '24h'
    );
    this.swap.ExchangeTable = await this.swap.getExchange();
    this.SelectedChain =
      JSON.parse(localStorage.getItem('MultiSwapTable') || '') || [];
  }

  async SearchPair() {
    if (this.SwapSearch) {
      this.SwapTable = await this.search.getSearchChain(
        this.SwapSearch,
        this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase()
      );
    }
  }
  SelectedPair(index: number) {
    const chain = this.swap.ExchangeTable.findIndex(
      (a: any) =>
        a.chain ===
        this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase()
    );
    const UrlSwap = this.swap.ExchangeTable[chain].data.find(
      (a: any) => a.slug == this.SwapTable.results[index].id.exchange
    );
    this.SelectedChain.push([this.SwapTable.results[index], UrlSwap]);
    localStorage.setItem('MultiSwapTable', JSON.stringify(this.SelectedChain));
    this.SwapSearch = '';
  }
  DeleteChain(index: number) {
    this.SelectedChain.splice(index, 1);
    localStorage.setItem('MultiSwapTable', JSON.stringify(this.SelectedChain));
  }

  AccederChain(item: any) {
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
