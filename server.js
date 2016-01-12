var express = require('express'),
    accepts = require('accepts'),
    app = express(), 
    router = express.Router(),
    port = process.env.PORT || 3000;
    
router.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var languages = accepts(req).languages();
  if (languages.length == 1)
    languages = languages[0];
  var userAgent = req.headers['user-agent'].match(/^([\w\/\.]+) \(([\w\s\.]+; [\w\s]+)\)( .*)/), op = "";
  if (userAgent) {
    op = userAgent[2];
  }
  var str = {"ipaddress":ip, "language":languages, "software":op};
  res.json(str);
  console.log("Receiving request from " + ip + "\n");
});

app.use('*', router);

app.listen(port, function () {
  console.log("The node server is running.");
});
    