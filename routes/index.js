var _ = require('lodash');
var async = require('async');
var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var multiparty = require('multiparty');
var path = require('path');
var randomstring = require('randomstring');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('home');
});

router.post('/upload', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var saveFileLibrary = new SaveFileLibrary();
    files = _.values(_.mapValues(files, function(n) { return n[0]; }));
    async.map(files, saveFileLibrary.saveFile.bind(saveFileLibrary), function(err, results) {
      res.json(saveFileLibrary.id);
    });
  });
});

module.exports = router;

var SaveFileLibrary = function() {
  var id = randomstring.generate();
  return {
    id: id,
    saveFile: saveFile
  };

  function saveFile(file, callback) {
    fs.readFile(file.path, function (err, data) {
      if(err) {
        return callback(err, null);
      }

      var newDir = path.join(__dirname, '../', 'tmp', id);
      var newPath = path.join(newDir, file.originalFilename);
      mkdirp(newDir, function(err) {
        if(err) {
          return callback(err, null);
        }

        fs.writeFile(newPath, data, function (err) {
          callback(err, newPath);
        });
      });

    });
  }
}
