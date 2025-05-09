export type MarketDataResponseType = {
    symbol: string;
    data: DataObject[]
}

export type DataObject = {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export type MarketDataArrayType = 
  {
    key: string;
    data: MarketDataObjectType[];
    color: string;
    dataPointsColor: string;
    startFillColor: string;
  }
;

export type MarketDataObjectType = {
    value: number;
    label: string;
}
