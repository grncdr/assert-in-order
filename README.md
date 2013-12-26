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

Each assertion should be an array whose first item is a method name. Any
additional items are appended to the argument list when the assertion is
called. For example, `group[0](true)` is equivalent to
`assert.ok(true, 'first assertion')` with an additional ordering check.

```javascript
var group1 = inOrder(assert, assertions)

assert.equal(group1.length, 2)

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

assert.equal(group3.length, 2)

group3.first(true)
group3.second(true)
```

The ordering checks do not change the number of assertions that will be run so
you can use this with [tap][] or [tape][] and test plans:

```javascript
require('tape')('Assertion ordering', function (t) {
  var group = inOrder(t, {
    first: ['pass', 'radical'],
    second: ['pass', 'tubular']
  })
  t.plan(group.length)
  group.first()
  group.second()
})
```

## License

MIT
