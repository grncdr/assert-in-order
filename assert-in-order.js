module.exports = function assertInOrder (assert, assertions) {
  var ordering = []
  var idx = 0
  var group = {}
  for (var key in assertions) {
    if (!assertions.hasOwnProperty(key)) continue
    ordering.push(key)
    group[key] = wrap(key)
  }
  return group

  function wrap (key) {
    var extraArgs = assertions[key].slice()
      , method = extraArgs.shift()
    return function () {
      var args = [].slice.call(arguments).concat(extraArgs)
      if (key != ordering[idx]) {
        var message = [
          'assertion', key,
          'was called before assertion', ordering[idx]
        ].join(' ')
        assert.equal(key, ordering[idx], message)
      } else {
        ++ idx
        assert[method].apply(assert, args)
      }
    }
  }
}
