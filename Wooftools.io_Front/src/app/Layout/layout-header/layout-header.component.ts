import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/Service/chain.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { SearchService } from 'src/app/Service/search.service';
import { MultiSwapService } from 'src/app/Service/multiswapservice';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css'],
})
export class LayoutHeaderComponent {
  constructor(
    public router: Router,
    public chain: ChainService,
    public board: WoofBoardService,
    public search: SearchService,
    private swap: MultiSwapService
  ) {}
  async selectChain() {
    this.board.getAllTable();
    if (this.router.url === '/Stats') {
      this.swap.ExchangeTable = await this.swap.getExchange();
      const chain = this.swap.ExchangeTable.findIndex(
        (a: any) =>
          a.chain ===
          this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName.toLowerCase()
      );
      this.swap.ChainExchangeTable = this.swap.ExchangeTable[chain].data;
    }
  }
  async Search() {
    if (this.router.url != '/Search') {
      this.router.navigate(['/Search']);
    }
    this.search.PoolsTable = await this.search.getSearch(
      this.search.searchedValue
    );
  }
}
