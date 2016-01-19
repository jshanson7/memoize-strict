# memoize-strict [![NPM version][npm-image]][npm-url]

Memoization with multi-argument support.  Compares arguments with strict equality.

```javascript
import memoize from 'memoize-strict';

let counter = 0;
const memoizeTest = memoize((a, b) => {
  counter++;
  return typeof a + ' ' + typeof b;
});

memoizeTest(1, true); // => "number boolean"
counter; // => "1"
memoizeTest(1, true); // => "number boolean"
counter; // => "1"

const a = {a: 'a'};
const b = ['b'];
memoizeTest(a, b); // => "object object"
counter; // => "2"
memoizeTest(a, b); // => "object object"
counter; // => "2"

memoizeTest({a: 'a'}, ['b']); // => "object object"
counter; // => "3"
memoizeTest({a: 'a'}, ['b']); // => "object object"
counter; // => "4"
```

## Installation

```
npm i memoize-strict --save
```

## License

MIT

[npm-image]: https://badge.fury.io/js/memoize-strict.svg
[npm-url]: https://npmjs.org/package/memoize-strict
