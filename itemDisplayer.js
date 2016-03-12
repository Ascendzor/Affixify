React = require('react')
_ = require('lodash')
module.exports = React.createClass({
  render: function() {
    itemObject = this.props.item
    if(!itemObject) {
      return React.createElement('div', {}, 'enter an item')
    }
    return React.createElement('div', {},
      React.createElement('div', {}, 'base type: ' + itemObject.baseTypeName),
      React.createElement('div', {}, 'implicit: ' + itemObject.implicit),
      React.createElement('div', {}, 'prefixes: '),
      _.map(itemObject.prefixes, function(prefix) {
        return React.createElement('div', {key: prefix}, prefix)
      }),
      React.createElement('div', {}, 'suffixes: '),
      _.map(itemObject.suffixes, function(suffix) {
        return React.createElement('div', {key: suffix}, suffix)
      })
    );
  }
})
