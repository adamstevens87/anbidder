/* jshint node: true, devel: true */
'use strict';

const
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),
  request = require('request');


var app = express();
app.set('port', process.env.PORT || 5000);




/*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 *
 */
app.get('/token', function(req, res) {

  res.status(200).json({
        message: 'Welcome to the AN Bidder api'
    });
    console.log("This is the request: " + req);
});


// Start server
// Webhooks must be available via SSL with a certificate signed by a valid
// certificate authority.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
