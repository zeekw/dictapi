var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
//  res.render('upload');
  res.json('Isaac');
});

module.exports = router;