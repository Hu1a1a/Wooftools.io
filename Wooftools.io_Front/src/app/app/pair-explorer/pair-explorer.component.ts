import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChainService } from 'src/app/Service/chain.service';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { PairExplorerService } from 'src/app/Service/pairexplorer.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-pair-explorer',
  templateUrl: './pair-explorer.component.html',
  styleUrls: ['./pair-explorer.component.css'],
})
export class PairExplorerComponent implements OnInit {
  constructor(
    public chain: ChainService,
    public board: WoofBoardService,
    public pair: PairExplorerService,
    public priceFormat: PriceFormatService
  ) {}
  displayedColumns = ['Address', 'Supply', 'Amount', 'Value'];
  displayedColumns2 = [
    'Date',
    'Type',
    'Price USD',
    'Total',
    'Price ETH',
    'Amount WOOF',
    'Total ETH',
    'Maker',
  ];
  SelectedTable = 'TradeHistory';
  async ngOnInit() {
    if (this.chain.SelectedChain === 'ALL CHAINS') {
      this.chain.SelectedChain = 0;
      await this.chain.getChain();
    }
    this.board.hotPairs = await this.board.get(
      'Pairs',
      this.chain.Chains[this.chain.SelectedChain].chainShortName2
        ? this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName2.toLowerCase()
        : this.chain.Chains[
            this.chain.SelectedChain
          ].chainShortName.toLowerCase(),
      '24h'
    );
    this.pair.PairsTable = await this.pair.getPairs('Pairs');
    this.pair.SwapsTable = await this.pair.getSwaps('Swaps');
  }
}
