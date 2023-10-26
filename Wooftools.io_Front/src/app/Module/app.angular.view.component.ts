import { CoinGeckoComponent } from '../app/coingecko/coingecko.component';
import { WalletConnectComponent } from '../app/wallet-connect/wallet-connect.component';
import {
  WoofBoardComponent,
  WoofBoardFilterDialog,
} from '../app/woof-board/woof-board.component';
import { PairExplorerComponent } from '../app/pair-explorer/pair-explorer.component';
import { LiveNewPairsComponent } from '../app/live-new-pairs/live-new-pairs.component';
import { BigSwapExplorerComponent } from '../app/big-swap-explorer/big-swap-explorer.component';
import { MultiChartComponent } from '../app/multi-chart/multi-chart.component';
import { MultiSwapComponent } from '../app/multi-swap/multi-swap.component';
import { StatsComponent } from '../app/stats/stats.component';
import { WalletInfoComponent } from '../app/wallet-info/wallet-info.component';
import { SearchComponent } from '../app/search/search.component';

export const AppViewComponent = [
  CoinGeckoComponent,
  WalletConnectComponent,
  WoofBoardComponent,
  PairExplorerComponent,
  LiveNewPairsComponent,
  BigSwapExplorerComponent,
  MultiChartComponent,
  MultiSwapComponent,
  StatsComponent,
  WalletInfoComponent,
  WoofBoardFilterDialog,
  SearchComponent,
];
export const AppViewRouter = {
  WoofBoard: WoofBoardComponent,
  PairExplorer: PairExplorerComponent,
  LiveNewPairs: LiveNewPairsComponent,
  BigSwapExplorer: BigSwapExplorerComponent,
  MultiChart: MultiChartComponent,
  MultiSwap: MultiSwapComponent,
  Stats: StatsComponent,
  CoinGecko: CoinGeckoComponent,
  WalletConnect: WalletConnectComponent,
  WalletInfo: WalletInfoComponent,
  Search: SearchComponent,
};
