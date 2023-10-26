import { Component, OnInit } from '@angular/core';
import { MultiSwapService } from 'src/app/Service/multiswapservice';
import { ChainService } from 'src/app/Service/chain.service';
import { StatService } from 'src/app/Service/statservice';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(
    public swap: MultiSwapService,
    private chain: ChainService,
    private stat: StatService,
    public priceFormat: PriceFormatService,
    private board: WoofBoardService
  ) {}
  Expand = true;
  statTable: any = [];
  async ngOnInit() {
    if (this.chain.SelectedChain === 'ALL CHAINS') {
      this.chain.SelectedChain = 0;
      await this.chain.getChain();
    }
    this.swap.ExchangeTable = await this.swap.getExchange();
    const chain = this.swap.ExchangeTable.findIndex(
      (a: any) =>
        a.chain ===
        this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase()
    );
    this.swap.ChainExchangeTable = this.swap.ExchangeTable[chain].data;
    this.statTable = JSON.parse(localStorage.getItem('StatsTable') || '') || [];
    this.board.hotPairs = await this.board.get(
      'Pairs',
      this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase(),
      '24h'
    );
    console.log(this.board.hotPairs);
  }
  async SelectSlug(item: any) {
    const slug = await this.stat.getStats(
      this.chain.Chains[this.chain.SelectedChain].chainShortName.toLowerCase(),
      item.slug
    );
    this.statTable.push([slug.data[0].data[item.slug], item]);
    localStorage.setItem('StatsTable', JSON.stringify(this.statTable));
  }
  DeleteChain(index: number) {
    this.statTable.splice(index, 1);
    localStorage.setItem('StatsTable', JSON.stringify(this.statTable));
  }
}
