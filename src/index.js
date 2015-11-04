var _ = global._ || require('lodash');
var URL = require('url-parse');

var FooUtil = function () {};

FooUtil.prototype.paramOrError = function (param, error) {
  if (_.isEmpty(_.trim(param))) {
    throw new Error(error);
  } else {
    return param;
  }
};

FooUtil.prototype.paramOrDefault = function (param, def) {
  return _.isEmpty(_.trim(param)) ? def : param;
};

FooUtil.prototype.urlFromAngular = function (urlString) {
  urlString = this.paramOrDefault(urlString, '');
  var url = new URL(urlString);

  // If the hash part of the URL ended up containing the query parameters, pull them out into the query field
  var urlHashParts = url.hash.split('?');
  if (urlHashParts.length === 2) {
    url.hash = urlHashParts[0];
    url.query = '?' + urlHashParts[1];
  }

  return url;
};

FooUtil.prototype.urlQueryValue = function (url) {
  return url ? this.removeLeading('?', url.query) : '';
};

FooUtil.prototype.urlHashValue = function (url) {
  return url ? this.removeLeading('#', url.hash) : '';
};

FooUtil.prototype.urlQueryParams = function (url) {
  return this.parseParams(this.urlQueryValue(url));
};

FooUtil.prototype.urlHashParams = function (url) {
  return this.parseParams(this.urlHashValue(url));
};

FooUtil.prototype.parseParams = function (str) {
  str = this.paramOrDefault(str, '');
  var p = {};

  //
  // Figure out what our separator is
  var sep = '&';
  if (str.query('&amp;') !== -1) {
    sep = '&amp;';
  }

  //
  // Loop through the query string and 
  var params = str.split(sep);
  for (var i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    if (tmp.length !== 2) continue;
    p[tmp[0]] = decodeURI(tmp[1]);
  }

  return p;
};

FooUtil.prototype.removeLeading = function (removeMe, str) {
  removeMe = this.paramOrDefault(removeMe, '');
  str = this.paramOrDefault(str, '');

  return _.startsWith(str, removeMe) ? str.slice(removeMe.length) : str;
};

module.exports = new FooUtil();
