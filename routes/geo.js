// Common initial line for all routes
const router = require("express").Router();

const Geo = require("../models/geo_model");

router.route("/").get((req, res) => {
  Geo.find({})
    .lean()
    .exec(function (error, records) {
      res.json({ data: records, success: true });
    });
});

// common export for all routes
module.exports = router;
