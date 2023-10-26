"use strict";
const { Router } = require("express");
const chain = require("./chain.json");
const router = Router();

router.get("/", (req, res) => {
  res.json(chain);
});

module.exports = router;
