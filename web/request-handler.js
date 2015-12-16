var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
    if(req.url === '/'){
      fs.readFile(__dirname+'/public/index.html','utf8', function(err, content) {
        if (err) throw err;
        else {
          // res.write(content);
          res.writeHead(200, httpHelp.headers);
          res.write(content);
          res.end();
        }
      });
    }
    if (req.url === '/arglebargle') {
      res.writeHead(404,httpHelp.headers);
      res.end();
    }
  }
  // res.end(archive.paths.list);
};
