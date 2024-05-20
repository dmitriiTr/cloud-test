export interface PricesData {
    code: string;
    msg: string;
    data: Price[];
}

export interface PricesDataWithChange {
    code: string;
    msg: string;
    data: PriceWithChange[];
}

export interface Price {
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

export type PriceWithChange = Price & { change: ChangeType };

export type ChangeType = 'priceUp' | 'priceDown' | null;

export type Side = 'buy' | 'sell';