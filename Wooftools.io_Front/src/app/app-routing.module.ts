import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppViewRouter } from './Module/app.angular.view.component';

const routes: Routes = [
  {
    path: 'WoofBoard',
    component: AppViewRouter.WoofBoard,
  },
  {
    path: 'PairExplorer',
    component: AppViewRouter.PairExplorer,
  },
  {
    path: 'LiveNewPairs',
    component: AppViewRouter.LiveNewPairs,
  },
  {
    path: 'BigSwapExplorer',
    component: AppViewRouter.BigSwapExplorer,
  },
  {
    path: 'MultiChart',
    component: AppViewRouter.MultiChart,
  },
  {
    path: 'MultiSwap',
    component: AppViewRouter.MultiSwap,
  },
  {
    path: 'Stats',
    component: AppViewRouter.Stats,
  },
  {
    path: 'WalletInfo',
    component: AppViewRouter.WalletInfo,
  },
  {
    path: 'CoinGecko',
    component: AppViewRouter.CoinGecko,
  },
  {
    path: 'Account',
    component: AppViewRouter.WalletConnect,
  },
  {
    path: 'Search',
    component: AppViewRouter.Search,
  },
  {
    path: '**',
    redirectTo: 'WoofBoard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
