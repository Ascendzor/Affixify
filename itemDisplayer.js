React = require('react')
_ = require('lodash')
module.exports = React.createClass({
  render: function() {
    itemObject = this.props.item
    if(!itemObject) {
      return React.createElement('div', {}, 'enter an item')
    }
    debugger
    return React.createElement('div', {},
      React.createElement('div', {}, 'base type: ' + itemObject.baseTypeName),
      React.createElement('div', {}, 'implicit: ' + itemObject.implicit),
      React.createElement('div', {}, 'prefixes: '),
      _.map(itemObject.prefixes, function(prefix) {
        React.createElement('div', {}, prefix)
      }),
      React.createElement('div', {}, 'suffixes: '),
      _.map(itemObject.suffixes, function(suffix) {
        React.createElement('div', {}, suffix)
      })
    );
  }
})
