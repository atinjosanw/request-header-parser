var express = require('express'),
    app = express(), 
    router = express.Router(),
    port = process.env.PORT || 3000;
    
router.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(ip);
  console.log("received request from " + ip);
});

app.use('*', router);

// app.enable('trust proxy');

var server = app.listen(port, function () {
  console.log("The node server is running.");
});
    