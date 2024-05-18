export interface PricesData {
    code: string;
    msg: string;
    data: Prices[];
}

export interface PricesDataWithChange {
    code: string;
    msg: string;
    data: PricesWithChange[];
}

export interface Prices {
    sequence: number;
    symbol: string;
    side: Side;
    size: number;
    price: string;
    bestBidSize: number;
    bestBidPrice: string;
    bestAskPrice: string;
    tradeId: string;
    bestAskSize: number;
    ts: number;
}

export type ChangeType = 'priceUp' | 'priceDown' | null;
export type PricesWithChange = Prices & {change: ChangeType};

export enum Side {
    Buy = 'buy',
    Sell = 'sell',
}
