var path = require('path');
var request = require('request');
var _ = require('lodash');

var CIRCLECI_ENDPOINT = 'https://circleci.com/api/v1/';

var circleci = {
  me: function(callback) {
    _get('me', function(err, body) {
      _return(err, body, callback);
    });
  },
  projects: function(callback) {
    _get('projects', function(err, body) {
      _return(err, body, callback);
    });
  },
  project: function(project, build_num, callback) {
    if (typeof build_num === 'function') {
      callback = build_num;
      build_num = '';
    };

    _get(path.join('project', project, build_num), function(err, body) {
      _return(err, body, callback);
    })
  },
  recentbuilds: function(callback) {
    _get('recent-builds', function(callback) {
      _return(err, body, callback);
    });
  },
  lastbuild: function(project, callback) {
    if (typeof project === 'function') {
      callback = project;
      project = '';
      call = 'recent-builds';
    } else {
      call = 'project';
    }

    _get(path.join(call, project), function(err, body) {
      _return(err, body, function(body) {
        callback(_.max(body, function(build) {
          return build.build_num;
        }));
      });
    });
  }
}

function _return(err, body, callback) {
  if (typeof callback === 'function') {
    if (err) callback(err);
    else callback(body);
  } else {
    if (err) return err;
    else return body;
  }
}

function _request(method, path, json, callback) {
  if (typeof json === 'function') {
    callback = json;
    json = undefined;
  }

  request({
    method: method,
    url: CIRCLECI_ENDPOINT+ path + '?circle-token=' + process.env.CIRCLECI_TOKEN,
    json: json,
  }, function (err, res) {
    if (err || res.statusCode !== 200) {
      callback(JSON.stringify(res.body) || res.statusCode);
    } else {
      callback(null, res.body);
    }
  });
};

function _get(path, callback) {
  _request('GET', path, true, callback);
};

module.exports = circleci;
