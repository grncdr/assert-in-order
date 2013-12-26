# assert-in-order

Assert a group of assertions are performed in order.

## Synopsis

```javascript
var assert = require('assert')
var inOrder = require('./')

var assertions = [
 ['ok', 'first assertion'],
 ['equal', 'second assertion']
]
```

The each assertion should be an array whose first item is a method name. Any
additional item are appended to the argument list when the assertion is called.

```javascript
var group1 = inOrder(assert, assertions)

// These pass
group1[0](true)
group1[1](1, 1)

// These don't
try {
  var group2 = inOrder(assert, assertions)
  group2[1](1, 1)
  group2[0](true)
} catch (err) {
  assert.equal(err.message, "assertion 1 was called before assertion 0")
}

// live life on the edge by abusing ordered object keys:
group3 = inOrder(assert, {
  first: ['ok', 'first assertion'],
  second: ['ok', 'second assertion']
})

group3.first(true)
group3.second(true)
```

## License

MIT
