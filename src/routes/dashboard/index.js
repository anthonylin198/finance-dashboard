import React, { useState } from "react";

import { Grid } from "@material-ui/core";
// import QuickStats from "./QuickStats";
// import AddCard from "./AddCard";
// import AssessmentsCard from "./AssessmentsCard";
// import RecentApplicantsCard from "./RecentApplicantsCard";
import axios from "axios";

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo

const Dashboard = () => {
  const [info, setInfo] = useState("");
  const [ticker, setTicker] = useState("");

  const api_key = "M51RO6KIJYURTFYD";

  async function onClick() {
    const url =
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
      ticker +
      "&apikey=" +
      api_key;
    const data = await axios.get(url);
    setInfo(data);
  }

  console.log(info.data);

  return (
    <div>
      {/* Your Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <h1>Enter Ticker</h1>
          <br></br>
          <input onChange={(e) => setTicker(e.target.value)}></input>
          <button onClick={() => onClick()}>Enter</button>
        </Grid>

        <Grid item xs={12} md={12}>
          <p>Data here:</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
