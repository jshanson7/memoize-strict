var toarr = require('toarr');

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length &&
    arr1.every(function (value, index) { return value === arr2[index]; });
}

function memoize(func) {
  var cache = [/* {args, value} */];
  var get = function (args) {
    return cache.find(function (mapping) { return arraysEqual(args, mapping.args); });
  };
  var set = function (mapping) { return cache.unshift(mapping) && mapping; };

  return function () {
    var args = toarr(arguments);
    var cached = get(args);
    
    return cached ?
      cached.value :
      set({args: args, value: func.apply(null, args)}).value;
  };
}

module.exports = memoize;
