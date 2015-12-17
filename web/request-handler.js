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
          console.log(files,'FILES');
          console.log(req.url.slice(1), "URL");
          if (_.contains(files, req.url.slice(1))){
            var asset = req.url;
            // console.log(asset, "ASSET")
            // console.log(archive.paths.archivedSites+asset,"ARCHIVE");
            httpHelp.serveAssets(res, archive.paths.archivedSites+asset); 

          } else {
            res.writeHead(404,httpHelp.headers);
            res.end();
          }
        }
      });
    }

  } 
  // res.end(archive.paths.list);
};
