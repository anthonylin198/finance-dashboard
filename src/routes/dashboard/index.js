import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo

const Dashboard = () => {
  const [info, setInfo] = useState([]);
  const [ticker, setTicker] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

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
      field: "data1",
      headerName: "data1",
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
    for (let i = 0; i < tickerArr.length; i++) {
      const url =
        "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
        tickerArr[i] +
        "&apikey=" +
        api_key;
      const data = await axios.get(url);
      promises.push(data.data);
    }
    Promise.all(promises)
      .then((results) => {
        setLoading(false);
        setInfo(results);
      })
      .catch((e) => {
        setLoading(false);
        console.log("errors", e);
      });
  }

  useEffect(() => {
    const newRows = [];
    for (let i = 0; i < info.length; i++) {
      newRows.push({
        id: i,
        company: info[i].Name,
        ticker: info[i].Symbol,
        movingAverage: info[i]["50DayMovingAverage"],
      });
    }
    setRows(newRows);
  }, [info]);

  let isLoading;
  if (loading) {
    isLoading = <div>Loading</div>;
  }

  return (
    <div>
      {/* Your Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h1>Enter Tickers Separated by Commas with no spaces inbetween</h1>
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
