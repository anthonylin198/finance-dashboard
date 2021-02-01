import { tickersSlice } from "./tickers";
import { overviewSlice } from "./overview";
const reducers = {
  tickers: tickersSlice.reducer,
  overview: overviewSlice.reducer,
};

export default reducers;
