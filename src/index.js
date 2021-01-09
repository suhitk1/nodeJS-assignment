const express = require("express");
const fetch = require("node-fetch");
const ExpressCache = require("express-cache-middleware");
const cacheManager = require("cache-manager");
const unirest = require("unirest");
const app = express();
const port = 9999;

app.listen(port, () => console.log(`App listening on port ${port}!`));

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: "memory",
    max: 10000,
    ttl: 3600
  })
);
cacheMiddleware.attach(app);

app.get("/getanalysis", (req, res) => {
  var req = unirest(
    "GET",
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis"
  );

  req.query({
    symbol: "AMRN",
    region: "US"
  });

  req.headers({
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "x-rapidapi-key": "9b6f96fc31msh9e9277b13767b96p111df1jsn17134fdb477c",
    useQueryString: true
  });

  req.end(function (r) {
    if (r.error) throw new Error(r.error);
    console.log(r.body);
    res.send(r.body);
  });
});

app.get("/getnews", (req, res) => {
  var req = unirest(
    "GET",
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details"
  );

  req.query({
    uuid: "9803606d-a324-3864-83a8-2bd621e6ccbd",
    region: "US"
  });

  req.headers({
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "x-rapidapi-key": "9b6f96fc31msh9e9277b13767b96p111df1jsn17134fdb477c",
    useQueryString: true
  });

  req.end(function (r) {
    if (r.error) throw new Error(r.error);

    console.log(r.body);
    res.send(r.body);
  });
});
