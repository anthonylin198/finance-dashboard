import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo

const Dashboard = () => {
  const [info, setInfo] = useState("");
  const [ticker, setTicker] = useState("");

  const api_key = "M51RO6KIJYURTFYD";

  async function onClick() {
    // loop through all of the tickers, separated by a comma, and put into an array

    // create a request to the api route for each
    const url =
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
      ticker +
      "&apikey=" +
      api_key;
    const data = await axios.get(url);
    setInfo(data.data);
  }

  console.log(info);

  // column info
  const columns = [
    { field: "company", headerName: "Company Name", width: 200 },
    { field: "ticker", headerName: "Ticker", width: 100 },
    {
      field: "movingAverage",
      headerName: "50 Day Moving Average",
      // type: "number",
      width: 250,
    },
  ];

  const rows = [
    {
      id: 1,
      company: info.Name,
      ticker: info.Symbol,
      movingAverage: info["50DayMovingAverage"],
    },
  ];

  return (
    <div>
      {/* Your Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h1>Enter Tickers Separated by Commas</h1>
          <br></br>
          <input onChange={(e) => setTicker(e.target.value)}></input>
          <button onClick={() => onClick()}>Enter</button>
        </Grid>

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
