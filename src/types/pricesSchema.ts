export interface PricesData {
    code: string;
    msg: string;
    data: Prices[];
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

export enum Side {
    Buy = 'buy',
    Sell = 'sell',
}
