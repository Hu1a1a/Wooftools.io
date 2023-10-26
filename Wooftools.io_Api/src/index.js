const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.set("json space", 2);
app.use(morgan("dev"));
app.use(cors());

app.use("/shared/Chain", require("./shared/chain/index"));
app.use("/shared/Pairs", require("./shared/pairs/index"));
app.use("/shared/Gainers", require("./shared/gainers/index"));
app.use("/shared/Losers", require("./shared/losers/index"));
app.use("/shared/Updated", require("./shared/updated/index"));
app.use("/shared/Exchanges", require("./shared/exchanges/index"));
app.use("/shared/Stats", require("./shared/stats/index"));
app.use("/shared/Hotpairs", require("./shared/hotpairs/index"));

app.use("/pair/Pairs", require("./pair/pairs/index"));
app.use("/pair/Swaps", require("./pair/swaps/index"));
//app.use("/pair/Pools", require("./pair/pools/index"));
app.use("/pair/Exchange", require("./pair/exchange/index"));
app.use("/pair/Hotpairs", require("./pair/hotpairs/index"));

//app.use("/Swap", require("./swap/index"));

app.use("/Search", require("./search/index"));

app.use("/404", require("./404/index"));
app.use("/", require("./404/index"));

app.listen(3002);
