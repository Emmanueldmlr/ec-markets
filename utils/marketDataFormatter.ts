import { CHART_KEYS, CHART_KEYS_COLORS_PAIRS } from "@/constants/ChartKeys";
import {
  DataObject,
  MarketDataArrayType,
  MarketDataResponseType,
} from "@/types/marketDataType";

/**
 * Format the market data to be used in the chart
 * @param marketData - The market data to be formatted
 * @returns The formatted market data
 */
export function formatMarketData(
  marketData: MarketDataResponseType
): MarketDataArrayType[] {
  const { data } = marketData;

  // Group and average the data by year
  const openData = groupAndAverageByYear(data, "open");
  const closeData = groupAndAverageByYear(data, "close");
  const highData = groupAndAverageByYear(data, "high");
  const lowData = groupAndAverageByYear(data, "low");

  return [
    {
      key: CHART_KEYS.OPEN,
      data: openData,
      color: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.OPEN],
      dataPointsColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.OPEN],
      startFillColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.OPEN],
    },
    {
      key: CHART_KEYS.CLOSE,
      data: closeData,
      color: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.CLOSE],
      dataPointsColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.CLOSE],
      startFillColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.CLOSE],
    },
    {
      key: CHART_KEYS.HIGH,
      data: highData,
      color: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.HIGH],
      dataPointsColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.HIGH],
      startFillColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.HIGH],
    },
    {
      key: CHART_KEYS.LOW,
      data: lowData,
      color: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.LOW],
      dataPointsColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.LOW],
      startFillColor: CHART_KEYS_COLORS_PAIRS[CHART_KEYS.LOW],
    },
  ];
}

/**
 * Group and average the data by year
 * @param data - The data to be grouped and averaged
 * @param key - The key to be grouped and averaged
 * @returns The grouped and averaged data
 */

// Function to group and average the data by year
function groupAndAverageByYear(data: DataObject[], key: keyof DataObject) {
  const yearMap: { [year: string]: number[] } = {};
  data.forEach((item) => {
    const year = new Date(item.timestamp * 1000).getFullYear().toString();
    if (!yearMap[year]) yearMap[year] = [];
    yearMap[year].push(item[key] as number);
  });
  const result = Object.entries(yearMap).map(([year, values]) => ({
    value: values.reduce((a, b) => a + b, 0) / values.length,
    label: year,
  }));

  // Add default 0 if not present
  if (!yearMap["0"]) {
    result.push({ value: 0, label: "0" });
  }

  // sort by year in ascending order
  result.sort((a, b) => Number(a.label) - Number(b.label));

  return result;
}
