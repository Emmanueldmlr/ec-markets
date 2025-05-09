import { FetchMarketData } from "@/services/MarketDataSrv";
import { MarketDataArrayType } from "@/types/marketDataType";
import { formatMarketData } from "@/utils/marketDataFormatter";
import React, { useEffect, useState } from "react";

const useMarketData = () => {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketDataArrayType[] | null>(
    null
  );
  useEffect(() => {
    // Fetch market data from the apidog mock server
    const getMarketData = async () => {
      try {
        setIsFetchingData(true);
        const data = await FetchMarketData({ stockName: "AAPL" });
        const formattedData = formatMarketData(data); // Format the market data to be used in the chart
        setMarketData(formattedData); // Set the market data
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setIsFetchingData(false);
      }
    };
    getMarketData();
  }, []);

  return {
    marketData,
    isFetchingData,
    setIsFetchingData,
    error,
  };
};

export default useMarketData;
