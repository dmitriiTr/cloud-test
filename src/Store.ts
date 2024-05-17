import { makeAutoObservable, runInAction } from 'mobx';

import { PricesData } from './types/pricesSchema';
import { createContext } from 'react';

export class Store {
  constructor() {
    makeAutoObservable(this);
  }
  readonly #polonexApi = 'https://futures-api.poloniex.com/api/v2/tickers';
  fetchInterval: number | null = null;
  dashboard: PricesData | null = null; // initial value

  async init() {
    if (!this.fetchInterval) {
      await this.fetchData(); // initial fetch
      this.fetchInterval = setInterval(() => this.fetchData(), 5000);
    }
  }

  async fetchData() {
    try {
      const res = await fetch(this.#polonexApi);
      const data = await res.json() as PricesData;
      console.info('Received panel info ' + (new Date()).toString(), data);
      runInAction(() => {
        this.dashboard = data;
      });
    } catch (e) {
      console.error('Error getting panel info: ' + e);
    }
  }

  dispose() {
    if (this.fetchInterval) {
      clearTimeout(this.fetchInterval);
      this.fetchInterval = null;
    }
  }
}

export const StoreContext = createContext<Store | null>(null);