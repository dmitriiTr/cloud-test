import { Price, PriceWithChange, PricesData } from '../../types/pricesTypes';
import { action, autorun, makeAutoObservable, runInAction } from 'mobx';

export type Tabs = 'A' | 'B';

export class Store {
  constructor(tab?: string) {
    this.selectedTab = (tab ?? 'A') as Tabs;
    makeAutoObservable<Store, 'initA' | 'initB'>(this, {
      dispose: action, // Если не указать что это экшены, авторан
      //disposeB: action, // думает что это обрезваблы(или типа того) и реранится
      initA: action,
      initB: action
    });
    autorun(() => {
      if (this.selectedCoin === null) {
        if (this.selectedTab === 'A') {
          this.initA();
        } else {
          this.initB();
        }
      } else {
        this.dispose();
      }
    },);
  }
  private readonly polonexApiA =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private tableDataA: PriceWithChange[] = [];

  private readonly polonexApiB =
    'https://futures-api.poloniex.com/api/v2/tickers';
  private tableDataB: PriceWithChange[] = [];

  private fetchInterval: number | null = null;

  get pricesForCurrentTab() {
    if (this.selectedTab === 'A') {
      // Имитация разных данных
      const filtered = this.tableDataA.slice(0, 6);
      return filtered;
    } else {
      const filtered = this.tableDataB.slice(6, 12);
      return filtered;
    }
  }

  modalError: Error | null = null;

  selectedCoin: PriceWithChange | null = null;
  selectCoin = (symbol: string | null) => { // тут потребовало стрелочную
    this.selectedCoin = this.tableDataA.filter(d => d.symbol === symbol)?.at(0) || null;
  };

  selectedTab: Tabs = 'A';
  setTab(tab: Tabs) {
    this.selectedTab = tab;
  }

  private toPriceWithChange(oldData: PriceWithChange, newPrices: Price[]) {
    const newData = newPrices.filter(n => n.symbol === oldData.symbol).at(0);
    // Предполагаем, что не нужно менять строку если tradeId тот же
    const changed = newData?.tradeId !== oldData.tradeId;
    if (changed && newData) {
      const newPriceNumber = parseFloat(newData.price);
      const oldPriceNumber = parseFloat(oldData.price);
      const change = newPriceNumber === oldPriceNumber
        ? null
        : newPriceNumber > oldPriceNumber
          ? 'priceUp' : 'priceDown';
      const newPrice: PriceWithChange = { ...newData, change };
      return newPrice;
    }
    return oldData;
  }

  private async initA() {
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataA(), 5000);
    });
    this.fetchDataA();
  }

  private async fetchDataA() {
    try {
      const res = await fetch(this.polonexApiA);
      if (!res.ok) {
        throw new Error(`Status ${res.status} ${res.statusText}`);
      }
      const data = await res.json() as PricesData;
      console.info('Received panel info ' + (new Date()).toString(), data);
      runInAction(() => {
        if (this.tableDataA.length) {
          this.tableDataA = this.tableDataA.map(d => this.toPriceWithChange(d, data.data));
        } else {
          const emptyChangeData = data.data.map(d => ({ ...d, change: null, priceNumber: parseFloat(d.price) || 0 }));
          this.tableDataA = emptyChangeData.map(d => this.toPriceWithChange(d, data.data));
        }
        this.modalError = null;
        // Размещение тут: Близость против реактивности и ед. ответственности
      });
    } catch (e) {
      console.error('Error getting panel info: ' + e);
      if (e instanceof Error) {
        runInAction(() => {
          this.modalError = e as Error;
          console.error(this.modalError?.message);
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

  private async initB() {
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataB(), 5000);
    });
    this.fetchDataB();
  }

  private async fetchDataB() {
    try {
      const res = await fetch(this.polonexApiB);
      if (!res.ok) {
        throw new Error(`Status ${res.status} ${res.statusText}`);
      }
      const data = await res.json() as PricesData;
      console.info('Received panel info ' + (new Date()).toString(), data);
      runInAction(() => {
        if (this.tableDataB.length) {
          this.tableDataB = this.tableDataB.map(d => this.toPriceWithChange(d, data.data));
        } else {
          const emptyChangeData = data.data.map(d => ({ ...d, change: null, priceNumber: parseFloat(d.price) || 0 }));
          this.tableDataB = emptyChangeData.map(d => this.toPriceWithChange(d, data.data));
        }
        this.modalError = null;
        // Размещение тут: Близость против реактивности и ед. ответственности
      });
    } catch (e) {
      console.error('Error getting panel info: ' + e);
      if (e instanceof Error) {
        runInAction(() => {
          this.modalError = e as Error;
          console.error(this.modalError?.message);
        });
      }
    }
  }
}