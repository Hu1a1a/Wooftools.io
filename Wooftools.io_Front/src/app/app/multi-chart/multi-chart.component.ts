import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/Service/chain.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { PairExplorerService } from 'src/app/Service/pairexplorer.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
import { BigSwapExplorerService } from 'src/app/Service/bigswapexplorer.service';
import { MultiChartService } from 'src/app/Service/multichart.service';
import { SearchService } from 'src/app/Service/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-multi-chart',
  templateUrl: './multi-chart.component.html',
  styleUrls: ['./multi-chart.component.css'],
})
export class MultiChartComponent implements OnInit {
  constructor(
    public chain: ChainService,
    public board: WoofBoardService,
    public pair: PairExplorerService,
    public priceFormat: PriceFormatService,
    public swap: BigSwapExplorerService,
    public multichart: MultiChartService,
    public search: SearchService,
    private router: Router
  ) {}
  SelectTableSize = '6';
  ChartSearch = '';
  ChartTable: any;
  SelectedChain: Array<any> = [];

  async ngOnInit() {
    if (this.chain.SelectedChain === 'ALL CHAINS') {
      this.chain.SelectedChain = 0;
      await this.chain.getChain();
    }
    this.multichart.HotPairs = await this.multichart.getHotpairs();
    this.SelectedChain =
      JSON.parse(localStorage.getItem('MultiChainTable') || '') || [];
  }
  async SearchPair() {
    if (this.ChartSearch) {
      this.ChartTable = await this.search.getSearch(this.ChartSearch);
    }
  }
  SelectedPair(index: number) {
    this.SelectedChain.push(this.ChartTable.results[index]);
    localStorage.setItem('MultiChainTable', JSON.stringify(this.SelectedChain));
    this.ChartSearch = '';
  }
  DeleteChain(index: number) {
    this.SelectedChain.splice(index, 1);
    localStorage.setItem('MultiChainTable', JSON.stringify(this.SelectedChain));
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
