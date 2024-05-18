import { Prices, PricesData, PricesDataWithChange, PricesWithChange } from './types/pricesSchema';
import { action, autorun, makeAutoObservable, runInAction } from 'mobx';

type Tabs = 'A' | 'B';

export class Store {
  constructor(tab?: string) {
    console.log(tab);
    this.selectedTab = tab as Tabs ?? 'A';
    makeAutoObservable(this, {
      dispose: action, // Если не указать что это экшены, авторан
      //disposeB: action, // думает что это обрезваблы(или типа того) и реранится
      initA: action,
      initB: action
    });
    console.log('contr');
    autorun(() => {
      console.log('Auto', this.selectedTab);
      if (this.selectedTab === 'A') {
        this.initA();
      } else {
        this.initB();
      }
    },);
  }
  private readonly polonexApiA =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private dashboardA: PricesDataWithChange | null = null;

  private readonly polonexApiB =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private dashboardB: PricesDataWithChange | null = null;

  private fetchInterval: number | null = null;

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

  selectedCoin: PricesWithChange | null = null;
  selectCoin = (symbol: string) => { // тут потребовало стрелочную
    this.selectedCoin = this.dashboardA?.data.filter(d => d.symbol === symbol)?.[0] || null;
  };

  selectedTab: Tabs = 'A';
  setTab(tab: Tabs) {
    this.selectedTab = tab;
  }

  private toPriceWithChange(newPrices: Prices, dashboard: PricesDataWithChange | null) {
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
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataA(), 5000);
    });
    this.fetchDataA();
  }

  private async fetchDataA() {
    console.log('fetch A', this.fetchInterval);
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

  dispose() {
    if (this.fetchInterval) {
      clearTimeout(this.fetchInterval);
      this.fetchInterval = null;
    }
  }

  async initB() {
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataB(), 5000);
    });
    this.fetchDataB();
  }

  private async fetchDataB() {
    console.log('fetch B', this.fetchInterval);
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
}