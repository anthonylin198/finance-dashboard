import { userSlice } from "./user";
import { companySlice } from "./company";
import { tickersSlice } from "./tickers";
const reducers = {
  user: userSlice.reducer,
  company: companySlice.reducer,
  tickers: tickersSlice.reducer,
};

export default reducers;
