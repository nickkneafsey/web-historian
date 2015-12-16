var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
    if(req.url === '/'){
      httpHelp.serveAssets(res,'/public/index.html');
    }
    else {
      res.writeHead(404,httpHelp.headers);
      res.end();
    }
  }
  // res.end(archive.git paths.list);
};
