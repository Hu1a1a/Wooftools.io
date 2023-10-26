import { Component, OnInit } from '@angular/core';
import { WoofBoardService } from 'src/app/Service/woofboard.service';
import { ChainService } from 'src/app/Service/chain.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PairExplorerService } from 'src/app/Service/pairexplorer.service';
import { PriceFormatService } from 'src/app/Service/priceformat.service';
@Component({
  selector: 'app-woof-board',
  templateUrl: './woof-board.component.html',
  styleUrls: ['./woof-board.component.css'],
})
export class WoofBoardComponent implements OnInit {
  constructor(
    public board: WoofBoardService,
    public chain: ChainService,
    public dialog: MatDialog,
    private router: Router,
    private pair: PairExplorerService,
    public priceFormat: PriceFormatService
  ) {}
  today = new Date();
  toYear = this.today.getFullYear();
  toMonth = this.today.getMonth();
  toDay = this.today.getDate();
  toHour = this.today.getHours() - 1;
  toYearDay: number = 0;
  TableDisplay = true;
  displayedColumns = [
    'Pair',
    'Price',
    '%',
    'WoofScore',
    'Created',
    'Volumen',
    'Swaps',
    'Liquidity',
    'T.M.Cap.',
    'Exchange',
  ];
  displayedColumnsExchanges = ['Exchange', 'Pools', 'Volume 24h', 'Swaps 24h'];
  ngOnInit(): void {
    this.chain.getChain();
    this.board.getAllTable();
    const YearDay = parseInt(
      ((this.toYear - 1900) * 365 + (this.toYear - 1900) / 4).toFixed(0)
    );
    let monthDay = 0;
    for (var i = 0; i <= this.toMonth; i++) {
      monthDay = monthDay + this.monthDay[i];
    }
    this.toYearDay = monthDay + YearDay + this.toDay + this.toHour / 24;
  }
  monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  GetTime(date: string) {
    if (date) {
      const year = parseInt(date.split('-')[0]);
      const month = parseInt(date.split('-')[1]);
      const day = parseInt(date.split('-')[2]);
      let hour = 0;
      if (date.split('T').length > 1) {
        hour = parseInt(date.split('T')[1].split(':')[0]);
      }
      const yearDay = parseInt(
        ((year - 1900) * 365 + (year - 1900) / 4).toFixed(0)
      );
      let monthDay = 0;
      for (var i = 0; i < month; i++) {
        monthDay = monthDay + this.monthDay[i];
      }
      const toYearDay = yearDay + monthDay + day + hour / 24;
      const diffDate = this.toYearDay - toYearDay;
      if (diffDate < 1) {
        if (diffDate * 24 < 1) {
          return '<1 h ago';
        }
        return (diffDate * 24).toFixed(0) + ' h ago';
      } else {
        return diffDate.toFixed(0) + ' days ago';
      }
    }
    return '-';
  }

  Ordenado = 1;
  Ordenar(dir: number, var1: string, var2: string, var3: string) {
    if (var3) {
      this.board.table.sort((a: any, b: any) => {
        if (a[var1][var2][var3] > b[var1][var2][var3]) {
          return dir;
        }
        return -dir;
      });
    } else if (var2) {
      this.board.table.sort((a: any, b: any) => {
        if (a[var1][var2] > b[var1][var2]) {
          return dir;
        }
        return -dir;
      });
    } else {
      this.board.table.sort((a: any, b: any) => {
        if (a[var1] > b[var1]) {
          return dir;
        }
        return -dir;
      });
    }
    this.Ordenado = -this.Ordenado;
    return (this.board.table = [...this.board.table]);
  }

  OrdenarDiff(dir: number, var1: string, var2: string) {
    this.board.table.sort((a: any, b: any) => {
      if (a[var1] / a['price' + var2] > b[var1] / b['price' + var2]) {
        return dir;
      }
      return -dir;
    });
    this.Ordenado = -this.Ordenado;
    return (this.board.table = [...this.board.table]);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(WoofBoardFilterDialog, {});
  }
  GoPairView(item: any) {
    this.chain.SelectedChain = this.chain.Chains.findIndex((i: any) =>
      i.chainShortName2
        ? i.chainShortName2.toLowerCase() === item._id.chain.toLowerCase()
        : i.chainShortName.toLowerCase() === item._id.chain.toLowerCase()
    );
    this.chain.SelectedPair = item._id.pair;
    this.router.navigate(['/PairExplorer']);
  }
}

@Component({
  selector: 'app-woofboard-filter',
  templateUrl: 'woof-board.filter.component.html',
  styleUrls: [
    './woof-board.component.css',
    './woof-board.filter.component.css',
  ],
})
export class WoofBoardFilterDialog {
  constructor(
    public board: WoofBoardService,
    public chain: ChainService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WoofBoardFilterDialog>
  ) {}
  OriginalTable = [];
  LiquidityMin: number | null = null;
  LiquidityMax: number | null = null;
  VolumeMin: number | null = null;
  VolumeMax: number | null = null;
  SwapsMin: number | null = null;
  SwapsMax: number | null = null;
  TMCapMin: number | null = null;
  TMCapMax: number | null = null;
  WOOFScore: number = 0;
  PoolMin: number | null = null;
  PoolMax: number | null = null;
  Exchange: string | null = null;
  Filter() {
    this.OriginalTable = this.board.table2;
    if (this.LiquidityMin) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a.pair.metrics.liquidity >= (this.LiquidityMin || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.LiquidityMax) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a.pair.metrics.liquidity <= (this.LiquidityMax || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.VolumeMin) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a['volume' + this.board.interval] >= (this.VolumeMin || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.VolumeMax) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a['volume' + this.board.interval] <= (this.VolumeMax || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.SwapsMin) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a['swaps' + this.board.interval] >= (this.SwapsMin || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.SwapsMax) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a['swaps' + this.board.interval] <= (this.SwapsMax || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.TMCapMin) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a.token.metrics.fdv >= (this.TMCapMin || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.TMCapMax) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a.token.metrics.fdv <= (this.TMCapMax || 0)) {
          return true;
        }
        return false;
      });
    }
    if (this.Exchange) {
      this.OriginalTable = this.OriginalTable.filter((a: any) => {
        if (a._id.exchange.includes(this.Exchange)) {
          return true;
        }
        return false;
      });
    }
    this.OriginalTable = this.OriginalTable.filter((a: any) => {
      if (a.pair.dextScore.total >= (this.WOOFScore || 0)) {
        return true;
      }
      return false;
    });

    return (this.board.table = [...this.OriginalTable]);
  }
  ClearFilter() {
    this.board.getAllTable();
  }
}
