# memoize-strict [![NPM version][npm-image]][npm-url]

Memoization with multi-argument support.  Compares arguments with strict equality.

```javascript
import memoize from 'memoize-strict';

let counter = 0;
const memoizeTest = memoize((a, b) => {
  counter++;
  return typeof a + ' ' + typeof b;
});

console.log(memoizeTest(1, 2)); // => "number number"
console.log(memoizeTest(1, 2)); // => "number number"
console.log(counter); // => "1"

console.log(memoizeTest({a: 'a'}, {b: 'b'})); // => "object object"
console.log(memoizeTest({a: 'a'}, {b: 'b'})); // => "object object"
console.log(counter); // => "3"

const a = {a: 'a'};
const b = {b: 'b'};
console.log(memoizeTest(a, b)); // => "object object"
console.log(memoizeTest(a, b)); // => "object object"
console.log(counter); // => "4"
```

## Installation

```
npm i memoize-strict --save
```

## License

MIT

[npm-image]: https://badge.fury.io/js/memoize-strict.svg
[npm-url]: https://npmjs.org/package/memoize-strict
