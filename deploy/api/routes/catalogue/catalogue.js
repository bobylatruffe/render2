const express = require("express");
const router = express.Router()
const fs = require("fs");
const path = require("path");

router.get("/catalogue", (req, resp) => {
    const listeCatalogue = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/catalogue.json")));

    resp.status(200).json(listeCatalogue);
})

module.exports = router;