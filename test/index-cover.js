var foo = require('../src/index.js');
var assert = require('assert');
var URL = require('url-parse');

// describe('Footils', function () {
//   describe('#urlFromAngular()', function () {
//     it('hash first, no query', function (done) {
//       var url = CU.urlFromAngular('http://test.com/x/y/#/map');
//       assert.equal('#/map', url.hash);
//       assert.equal('', url.query);
//     });
//   });
// });

describe('Footils', function () {
  describe('#paramOrError()', function () {
    it('paramOrError equals', function (done) {
      var p = 'valid';
      var e = 'Should Not Occur';

      assert.equal(foo.paramOrError(p, e), p);
      done();
    });
    it('paramOrError equals NO excetion', function (done) {
      var p = 'valid';
      var e = 'Should Not Occur';

      assert.doesNotThrow(function () {
        foo.paramOrError(p, e);
      }, e);
      done();
    });
    it('paramOrError NOT equals', function (done) {
      var e = 'Should Occur';

      assert.throws(
        function () {
          foo.paramOrError(null, e);
        },
        function (err) {
          if ( (err instanceof Error) && e === err.message) {
            return true;
          }
        }
      );
      done();
    });
  });

  describe('#paramOrDefault()', function () {
    it('paramOrDefault valid', function (done) {
      var p = 'givenValue';
      var d = 'defaultValue';

      assert.equal(foo.paramOrDefault(p, d), p);
      done();
    });
    it('paramOrDefault not defined', function (done) {
      var p;
      var d = 'defaultValue';

      assert.equal(foo.paramOrDefault(p, d), d);
      done();
    });
    it('paramOrDefault empty', function (done) {
      var p = '';
      var d = 'defaultValue';

      assert.equal(foo.paramOrDefault(p, d), d);
      done();
    });
    it('paramOrDefault empty (spaces)', function (done) {
      var p = '  ';
      var d = 'defaultValue';

      assert.equal(foo.paramOrDefault(p, d), d);
      done();
    });
    it('paramOrDefault not valid and default not valid', function (done) {
      assert.equal(foo.paramOrDefault(null, null), null);
      done();
    });
  });

  describe('#urlFromAngular()', function () {
    var base = 'http://test.com/x/y';
    var queryNotNull = '?a=b&2=1';
    var queryNull = '';
    var hashNotNull = '#/testing';
    var hashNull = '';

    it('urlFromAngular no url', function (done) {
      var url = foo.urlFromAngular('');

      assert.equal(url.hash, '');
      assert.equal(url.query, '');
      done();
    });
    it('urlFromAngular (+ hash,- query)', function (done) {
      var urlString = base + '/' + hashNotNull;
      var url = foo.urlFromAngular(urlString);

      assert.equal(url.hash, hashNotNull);
      assert.equal(url.query, queryNull);
      done();
    });
    it('urlFromAngular (+ hash,+ query)', function (done) {
      var urlString = base + '/' + hashNotNull + queryNotNull;
      var url = foo.urlFromAngular(urlString);

      assert.equal(url.hash, hashNotNull);
      assert.equal(url.query, queryNotNull);
      done();
    });
    it('urlFromAngular (+ query,- hash)', function (done) {
      var urlString = base + '/' + queryNotNull;
      var url = foo.urlFromAngular(urlString);

      assert.equal(url.hash, hashNull);
      assert.equal(url.query, queryNotNull);
      done();
    });
    it('urlFromAngular (+ query,+ hash)', function (done) {
      var urlString = base + '/' + queryNotNull + hashNotNull;
      var url = foo.urlFromAngular(urlString);

      assert.equal(url.hash, hashNotNull);
      assert.equal(url.query, queryNotNull);
      done();
    });
  });

  describe('#urlQueryValue()', function () {
    var url = new URL('');

    it('urlQueryValue empty', function (done) {
      url.query = '';
      assert.equal(foo.urlQueryValue(url), '');
      done();
    });
    it('urlQueryValue starts with ?', function (done) {
      var value = 'foo=bar';
      url.query = '?' + value;

      assert.equal(foo.urlQueryValue(url), value);
      done();
    });
    it('urlQueryValue NOT starts with ?', function (done) {
      var value = 'foo=bar';
      url.query = value;

      assert.equal(foo.urlQueryValue(url), value);
      done();
    });
  });

  describe('#urlHashValue()', function () {
    var url = new URL('');

    it('urlHashValue empty', function (done) {
      url.hash = '';
      assert.equal(foo.urlHashValue(url), '');
      done();
    });
    it('urlHashValue starts with #', function (done) {
      var value = '/foo';
      url.hash = '#' + value;

      assert.equal(foo.urlHashValue(url), value);
      done();
    });
    it('urlHashValue NOT starts with #', function (done) {
      var value = '/foo';
      url.hash = value;

      assert.equal(foo.urlHashValue(url), value);
      done();
    });
  });
});
