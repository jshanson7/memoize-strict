var Multikey = require('multikey');
var toarr = require('toarr');

function memoize(func) {
  var cache = new Multikey();
  var fn = function () {
    var args = toarr(arguments);

    return cache.has(args) ?
      cache.get(args) :
      cache.set(args, func.apply(null, args)).get(args);
  };

  fn.clear = cache.clear.bind(cache);

  return fn;
}

module.exports = memoize;
