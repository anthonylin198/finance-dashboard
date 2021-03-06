import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
//https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo

// Redux imports
import { useDispatch } from "react-redux";
import { addTicker } from "../../redux/reducers/tickers";
import { updateOverview } from "../../redux/reducers/overview";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [ticker, setTicker] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const reduxRows = useSelector((state) => state.overview.rows);

  const api_key = "M51RO6KIJYURTFYD";

  // column info
  const columns = [
    { field: "company", headerName: "Company Name", width: 200 },
    { field: "ticker", headerName: "Ticker", width: 100 },
    {
      field: "movingAverage",
      headerName: "50 Day Moving Average",
      width: 250,
    },
    {
      field: "currentPrice",
      headerName: "Current Price",
      width: 250,
    },
    {
      field: "data2",
      headerName: "data2",
      width: 250,
    },
    {
      field: "data3",
      headerName: "data3",
      width: 250,
    },
    {
      field: "data4",
      headerName: "data4",
      width: 250,
    },
    {
      field: "data5",
      headerName: "data5",
      width: 250,
    },
  ];

  async function onClick() {
    setLoading(true);
    // We need to use promise.all
    const promises = [];
    const tickerArr = ticker.split(",");
    dispatch(addTicker(tickerArr));
    for (let i = 0; i < tickerArr.length; i++) {
      const url =
        "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
        tickerArr[i] +
        "&apikey=" +
        api_key;

      const url2 =
        "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
        tickerArr[i] +
        "&apikey=" +
        api_key;
      const data = await axios.get(url);
      const data2 = await axios.get(url2);
      promises.push(data.data);
      promises[i].id = [i];
      promises[i]["Current Price"] = data2.data["Global Quote"];
    }
    Promise.all(promises)
      .then((results) => {
        setLoading(false);
        dispatch(updateOverview(results));
      })
      .catch((e) => {
        setLoading(false);
        console.log("errors", e);
      });
  }

  useEffect(() => {
    const newRows = [];
    for (let i = 0; i < reduxRows.length; i++) {
      newRows.push({
        id: i,
        company: reduxRows[i].Name,
        ticker: reduxRows[i].Symbol,
        movingAverage: reduxRows[i]["50DayMovingAverage"],
        currentPrice: reduxRows[i]["Current Price"]["05. price"],
      });
    }
    // dispatch(updateOverview(newRows));
    setRows(newRows);
    // eslint-disable-next-line
  }, [reduxRows]);

  let isLoading;
  if (loading) {
    isLoading = <div>Loading</div>;
  }

  return (
    <div>
      {/* Your Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h1>Enter Tickers</h1>
          <br></br>
          <input onChange={(e) => setTicker(e.target.value)}></input>
          <button onClick={() => onClick()}>Enter</button>
        </Grid>
        {isLoading}

        <Grid item xs={12} md={12}>
          <div style={{ height: "50vh", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={80}
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
