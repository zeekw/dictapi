var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
 
var router  = express.Router();

router.get('/:word', function(req, res) {
  var word = req.params.word;
 
  request('http://dictionary.reference.com/browse/' + word, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var definitions  = [];
      var $definitions = $('.def-set');

      for(var x = 0; x < $definitions.length; x++) {
        //console.log($definitions[x]);
        d = $($definitions[x]).text().replace("(", "").replace(")", "");
        definitions.push(d);
      }
      
      var def1 = definitions.slice(0,1).toString();
      var def1 = def1.substring(def1.indexOf(" "));
      if(def1.indexOf(":") !== -1){
        var def1 = def1.substring(0,def1.indexOf(":"));
      }
      
      var def2 = definitions.slice(1,2).toString();
      var def2 = def2.substring(def2.indexOf(" "));
      if(def2.indexOf(":") !== -1){
        var def2 = def2.substring(0,def2.indexOf(":"));
      }
      
      var def3 = definitions.slice(2,3).toString();
      var def3 = def3.substring(def3.indexOf(" "));
      if(def3.indexOf(":") !== -1){
        var def3 = def3.substring(0,def3.indexOf(":"));
      }
      
      res.render('def', {word: word, def1: def1, def2: def2, def3: def3});
    }
  });
  
  request('http://www.thesaurus.com/browse/' + word, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var definitions  = [];
      var $definitions = $('.def-set');

      for(var x = 0; x < $definitions.length; x++) {
        //console.log($definitions[x]);
        d = $($definitions[x]).text().replace("(", "").replace(")", "");
        definitions.push(d);
      }
    }
  });
  
});
 
module.exports = router;