var express     = require("express"),
    router      = express.Router(),
    moment      = require('moment'),
    request     = require("request"),
    bodyParser  = require("body-parser");

//     // Root Route
//     router.get("/", function(req,res){
// });
//Root Route

router.get('/', async (req, res, next) => {
  try {
    res.render("index/landing");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
