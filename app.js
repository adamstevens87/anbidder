/* jshint node: true, devel: true */
'use strict';

const
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),
  request = require('request'),
  querystring = require('querystring'),
  fs = require('fs');



var app = express();
app.set('port', process.env.PORT || 5000);




/*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 *
 */
app.get('/token', function(req, res) {

    // Build the post string from an object
    var post_data = querystring.stringify({
        'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
        'output_format': 'json',
        'output_info': 'compiled_code',
          'warning_level' : 'QUIET',
          'js_code' : req
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'https://an.barneym.sb.facebook.com/placementbid.ortb',
        port: '80',
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();



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
