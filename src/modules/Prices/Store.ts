import { PriceWithChange, PricesData } from '../../types/pricesTypes';
import { action, autorun, makeAutoObservable, runInAction } from 'mobx';

import { toPriceWithChange } from './helpers';

export type Tabs = 'A' | 'B';

export class Store {
  constructor(tab?: string) {
    this.selectedTab = (tab ?? 'A') as Tabs;
    makeAutoObservable<Store, 'initFetchingA' | 'initFetchingB'>(this, {
      dispose: action,
      initFetchingA: action,
      initFetchingB: action,
    });
    autorun(() => {
      if (this.selectedCoin === null) {
        if (this.selectedTab === 'A') {
          this.initFetchingA();
        } else {
          this.initFetchingB();
        }
      } else {
        this.dispose();
      }
    });
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
      const filtered = this.tableDataA.slice(0, 6);
      return filtered;
    } else {
      const filtered = this.tableDataB.slice(6, 12);
      return filtered;
    }
  }

  error: Error | null = null;

  selectedCoin: PriceWithChange | null = null;
  selectCoin = (symbol: string | null) => {
    this.selectedCoin =
      this.tableDataA.filter((d) => d.symbol === symbol)?.at(0) || null;
  };

  selectedTab: Tabs = 'A';
  setTab = (tab: Tabs) => {
    this.selectedTab = tab;
  };

  private initFetchingA = async () => {
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataA(), 5000);
    });
    this.fetchDataA();
  };

  private fetchDataA = async () => {
    try {
      const res = await fetch(this.polonexApiA);
      if (!res.ok) {
        throw new Error(`Status ${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as PricesData;
      console.info('Received panel info ' + new Date().toString(), data);
      runInAction(() => {
        if (this.tableDataA.length) {
          this.tableDataA = this.tableDataA.map((d) =>
            toPriceWithChange(d, data.data)
          );
        } else {
          const emptyChangeData = data.data.map((d) => ({
            ...d,
            change: null,
            priceNumber: parseFloat(d.price) || 0,
          }));
          this.tableDataA = emptyChangeData.map((d) =>
            toPriceWithChange(d, data.data)
          );
        }
        this.error = null;
      });
    } catch (e) {
      console.error('Error getting prices info: ' + e);
      runInAction(() => {
        if (e instanceof Error) {
          this.error = e;
          console.error(this.error?.message);
        }
      });
    }
  };

  dispose = () => {
    if (this.fetchInterval) {
      clearTimeout(this.fetchInterval);
      this.fetchInterval = null;
    }
  };

  private initFetchingB = async () => {
    if (this.fetchInterval) {
      this.dispose();
    }
    runInAction(() => {
      this.fetchInterval = setInterval(() => this.fetchDataB(), 5000);
    });
    this.fetchDataB();
  };

  private fetchDataB = async () => {
    try {
      const res = await fetch(this.polonexApiB);
      if (!res.ok) {
        throw new Error(`Status ${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as PricesData;
      console.info('Received panel info ' + new Date().toString(), data);
      runInAction(() => {
        if (this.tableDataB.length) {
          this.tableDataB = this.tableDataB.map((d) =>
            toPriceWithChange(d, data.data)
          );
        } else {
          const emptyChangeData = data.data.map((d) => ({
            ...d,
            change: null,
            priceNumber: parseFloat(d.price) || 0,
          }));
          this.tableDataB = emptyChangeData.map((d) =>
            toPriceWithChange(d, data.data)
          );
        }
        this.error = null;
      });
    } catch (e) {
      console.error('Error getting prices info: ' + e);
      runInAction(() => {
        if (e instanceof Error) {
          this.error = e;
          console.error(this.error?.message);
        }
      });
    }
  };
}
