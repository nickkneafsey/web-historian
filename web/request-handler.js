var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
var _ = require('underscore');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
    if(req.url === '/'){
// __dirname is .../web
      var asset = '/public/index.html';
      httpHelp.serveAssets(res, __dirname+asset); 
    } else {
      var files = [];
      fs.readdir(archive.paths.archivedSites, function(err, contents){
        if (err) throw err;
        else {
          files = contents;
          if (_.contains(files, req.url.slice(1))){
            var asset = req.url;
            httpHelp.serveAssets(res, archive.paths.archivedSites+asset); 
          } else {
            res.writeHead(404,httpHelp.headers);
            res.end();
          }
        }
      });
    }
  }
  else if (req.method === "POST") {   
    var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      var newURL = body.slice(4);
      archive.addUrlToList(newURL, function(err, content){
        archive.downloadUrls([newURL]);
        httpHelp.headers['Location'] = archive.paths.archivedSites + '/' + newURL; 
        res.writeHead(302, httpHelp.headers);
        res.end();
      });
  });

  } 
  // res.end(archive.paths.list);
};
