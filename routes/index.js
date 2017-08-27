var express     = require("express"),
    router      = express.Router(),
    moment      = require('moment'),
    request     = require("request"),
    bodyParser  = require("body-parser");

    // Root Route
    router.get("/", function(req,res){
      res.render("index/landing");
});
module.exports = router;
