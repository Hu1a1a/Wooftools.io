const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send(
    `<a href="https://www.wooftools.io/">WoofTools: API no válido!</a>"`
  );
});

module.exports = router;
