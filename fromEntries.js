module.exports = function fromEntries (iterable) {
  if (Object.fromEntries) return Object.fromEntries(iterable)
  return fromEntriesPonyfill(iterable)
}

function fromEntriesPonyfill (iterable) {
  return [...iterable]
    .reduce((obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }), {})
}
