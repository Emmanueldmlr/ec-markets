
/**
 * Fetch market data from the apidog mock server
 * @param stockName - The name of the stock to fetch data for
 * @returns The market data for the stock
 */

export const FetchMarketData = async ({stockName}: {stockName: string}) => {
  try {
    const response = await fetch(
      `https://mock.apidog.com/m1/892843-874692-default/marketdata/history/${stockName}`
    );
    const data = await response.json();
    if (data?.apidogError) {
      throw new Error("Failed to fetch market data. Please try again.");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to fetch market data. Please try again.");
  }
};
