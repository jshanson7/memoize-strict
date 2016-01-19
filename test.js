'use strict';

const assert = require('assert');
const memoize = require('./');

describe('memoize()', () => {
  it('return value', () => {
    let counter = 0;
    const value1 = { a: 'b' };
    const value2 = { c: 'd' };
    const value3 = { e: 'f' };
    const memoizeTest = memoize(key => {
      counter++;
      return {
        x: value1,
        y: value2,
        z: value3
      }[key];
    });
    
    assert(memoizeTest('x') === value1);
    assert(memoizeTest('x') === value1);
    assert(counter === 1);
    assert(memoizeTest('y') === value2);
    assert(memoizeTest('y') === value2);
    assert(counter === 2);
    assert(memoizeTest('z') === value3);
    assert(memoizeTest('z') === value3);
    assert(counter === 3);
  });
  it('primitives', () => {
    let counter = 0;
    const memoizeTest = memoize((a, b) => counter++);
    
    memoizeTest('a', 'b');
    assert(counter === 1);
    memoizeTest('a', 'b');
    assert(counter === 1);
    memoizeTest(1, 2);
    assert(counter === 2);
    memoizeTest(1, 2);
    assert(counter === 2);
    memoizeTest(false, undefined);
    assert(counter === 3);
    memoizeTest(false, undefined);
    assert(counter === 3);
  });
  it('non-primitives', () => {
    let counter = 0;
    const memoizeTest = memoize((a, b) => counter++);
    const a1 = { a: 'a' };
    const a2 = { a: 'a' };
    const a3 = a1;
    const b1 = { b: 'b' };
    const b2 = { b: 'b' };
    const b3 = b1;
    
    memoizeTest(a1, b1);
    assert(counter === 1);
    memoizeTest(a1, b1);
    assert(counter === 1);
    memoizeTest(a2, b2);
    assert(counter === 2);
    memoizeTest(a2, b2);
    assert(counter === 2);
    memoizeTest(a3, b3);
    assert(counter === 2);
    memoizeTest(a3, b3);
    assert(counter === 2);
  });
  it('no args', () => {
    let counter = 0;
    const memoizeTest = memoize(() => {
      counter++;
      return 'test';
    });
    
    assert(memoizeTest() === 'test');
    assert(counter === 1);
    assert(memoizeTest() === 'test');
    assert(counter === 1);
    assert(memoizeTest('a') === 'test');
    assert(counter === 2);
    assert(memoizeTest('a') === 'test');
    assert(counter === 2);
  });
  it('clear()', () => {
    let counter = 0;
    const memoizeTest = memoize(() => counter++);
    
    memoizeTest();
    assert(counter === 1);
    memoizeTest();
    assert(counter === 1);
    memoizeTest.clear();
    memoizeTest();
    assert(counter === 2);
    memoizeTest();
    assert(counter === 2);
  });
});
