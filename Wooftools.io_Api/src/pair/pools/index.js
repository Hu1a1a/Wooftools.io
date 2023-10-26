"use strict";
const { Router } = require("express");
const https = require("https");
const router = Router();

router.get("/", (req, res) => {
  var json = "";
  const options = {
    hostname: "www.dextools.io",
    path: "/chain-" + req.headers.chain + "/api/generic/pools?timestampToShow=" + Math.round(Date.now() / 1000) + "&range=1",
  };
  const request = https.get(options, (res1) => {
    res1.setEncoding("utf8");
    res1.on("data", (chunk) => {
      json += chunk;
    });
    res1.on("end", () => {
      res.send(json);
    });
  });
  request.end();
});

module.exports = router;
