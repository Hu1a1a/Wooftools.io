import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/Service/chain.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { PairExplorerService } from 'src/app/Service/pairexplorer.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
import { LiveNewPairService } from 'src/app/Service/livenewpair.service';
@Component({
  selector: 'app-live-new-pairs',
  templateUrl: './live-new-pairs.component.html',
  styleUrls: ['./live-new-pairs.component.css'],
})
export class LiveNewPairsComponent implements OnInit {
  constructor(
    public chain: ChainService,
    public board: WoofBoardService,
    public pair: PairExplorerService,
    public priceFormat: PriceFormatService,
    public live: LiveNewPairService
  ) {}
  displayedColumns = [
    'Pair info',
    'Listed Since',
    'Token Price USD',
    'Initial Liquidity',
    'Total Liquidity',
    'Pool Amount',
    'Pool Variation',
    'Pool Remaining',
  ];

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
    //this.live.PoolsTable = await this.live.getPools();
  }
}
