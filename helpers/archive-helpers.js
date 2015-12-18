var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls =  function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, content){
    if (err){
      callback(err);
    } else {
      var lines = content.split('\n');
      callback(lines);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(lines){
    callback(lines.indexOf(url) > -1);
  });
};

exports.addUrlToList = function(url, callback) {
  //console.log(url);
  fs.appendFile(exports.paths.list, url+'\n' ,'utf8', function(err, content){
    if (err) callback(err);
    else callback(err, content);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, content){
    if (err) {
      callback(err);
    }
    else {
      //return callback(content.indexOf(url) > -1);
      callback(_.contains(content, url));
    }
  });
};

// var requester = function(url){
//   request('http://'+url, function(err, response, body){
//     if (err){
//       throw err;
//     } else {
//       console.log("BODUY",body);
//       return body;
//     }
//   });
// };

exports.downloadUrls = function(urlArray) {
  // Iterate over urls and pipe to new files
  // _.each(urlArray, function (url) {
  //   if (!url) { return; }
  //   request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  // });


  _.each(urlArray, function(url){
    request('http://' + url, function(err, response, body) {
      if (err){console.log("ERROR")}
      else {
        //console.log("BODUY",body);
        fs.writeFile(exports.paths.archivedSites+'/'+url, body, function(err){
          if (err) throw err;
        });
      }
    });
  });

  // _.each(urlArray,function(url){
  //   fs.writeFile(exports.paths.archivedSites+'/'+url, request('http://'+url), function(err){
  //     if (err) throw err;
  //   });
  //   //fs.appendFile(exports.paths.archivedSites, url);
  // });
  
};
