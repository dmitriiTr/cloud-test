import { Prices, PricesData, PricesDataWithChange, PricesWithChange } from './types/pricesSchema';
import { action, autorun, makeAutoObservable, runInAction } from 'mobx';

import { createContext } from 'react';

type Tabs = 'A' | 'B';

export class Store {
  constructor(tab?: string) {
    console.log(tab);
    this.selectedTab = tab as Tabs ?? 'A';
    makeAutoObservable(this, {
      disposeA: action, // Если не указать что это экшены, авторан
      disposeB: action, // думает что это обрезваблы(или типа того) и реранится
      initA: action,
      initB: action
    });
    console.log('contr');
    autorun(() => {
      console.log('Auto', this.selectedTab);
      if (this.selectedTab === 'A') {
        this.disposeB();
        this.initA();
      } else {
        this.disposeA();
        this.initB();
      }
    },);
  }
  private readonly polonexApiA =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private fetchIntervalA: number | null = null; // Сделать один
  private dashboardA: PricesDataWithChange | null = null;

  private readonly polonexApiB =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private fetchIntervalB: number | null = null;
  private dashboardB: PricesDataWithChange | null = null;

  get pricesForCurrentTab() {
    console.log('get');
    if (this.selectedTab === 'A' && this.dashboardA?.data) {
      // Имитация разных данных
      const filtered = this.dashboardA.data.slice(0, 6);
      return filtered;
    } else if (this.dashboardB) {
      const filtered = this.dashboardB.data.slice(6, 12);
      return filtered;
    }
  }

  modalError: Error | null = null;

  selectedTab: Tabs = 'A';
  setTab(tab: Tabs) {
    this.selectedTab = tab;
  }

  private toPriceWithChange (newPrices: Prices, dashboard: PricesDataWithChange | null){
    const newData = parseFloat(newPrices.price);
    const oldData = parseFloat(dashboard?.data.filter(p => p.symbol === newPrices.symbol)[0].price || '');
    const change = dashboard === null || newData === oldData
      ? null
      : newData > oldData
        ? 'priceUp' : 'priceDown';
    const newPrice: PricesWithChange = { ...newPrices, change };
    return newPrice;
  }

  async initA() {
    if (!this.fetchIntervalA) {
      runInAction(() => {
        this.fetchIntervalA = setInterval(() => this.fetchDataA(), 5000);
      });
      this.fetchDataA();
    }
  }

  private async fetchDataA() {
    console.log('fetch A', this.fetchIntervalA, this.fetchIntervalB);
    try {
      const res = await fetch(this.polonexApiA);
      const data = await res.json() as PricesData;
      console.info('Received panel info ' + (new Date()).toString(), data);
      runInAction(() => {
        this.dashboardA = {
          ...data, data: data.data.map(d => this.toPriceWithChange(d, this.dashboardA))
        };
        this.modalError = null;
        // Размещение тут: Близость против реактивности и ед. ответственности
      });
    } catch (e) {
      console.error('Error getting panel info: ' + e);
      if (e instanceof Error) {
        runInAction(() => {
          this.modalError = e;
          console.error(this.modalError.message);
        });
      }
    }
  }

  disposeA() {
    if (this.fetchIntervalA) {
      clearTimeout(this.fetchIntervalA);
      this.fetchIntervalA = null;
    }
  }

  async initB() {
    if (!this.fetchIntervalB) {
      runInAction(() => {
        this.fetchIntervalB = setInterval(() => this.fetchDataB(), 5000);
      });
      this.fetchDataB(); // initial fetch
    }
  }

  private async fetchDataB() {
    console.log('fetch B', this.fetchIntervalA, this.fetchIntervalB);
    try {
      const res = await fetch(this.polonexApiB);
      const data = await res.json() as PricesData;
      console.info('Received panel info ' + (new Date()).toString(), data);
      runInAction(() => {
        this.dashboardB = {
          ...data, data: data.data.map(d => this.toPriceWithChange(d, this.dashboardB))
        };
        this.modalError = null;
        // Размещение тут: Близость против реактивности и ед. ответственности
      });
    } catch (e) {
      console.error('Error getting panel info: ' + e);
      if (e instanceof Error) {
        runInAction(() => {
          this.modalError = e;
          console.error(this.modalError.message);
        });
      }
    }
  }

  disposeB() {
    if (this.fetchIntervalB) {
      clearTimeout(this.fetchIntervalB);
      this.fetchIntervalB = null;
    }
  }
}

export const StoreContext = createContext<Store | null>(null);