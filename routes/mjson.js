var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.writeHead(200, {"Content-Type": "application/json"});
  var json = {type:"new_step","x":0,"y":0};
  res.end(JSON.stringify(json));
});

module.exports = router;
