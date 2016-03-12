React = require('react')
item = require('./item')
itemDisplayer = require('./itemDisplayer')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      inputValue: '',
      result: ''
    }
  },
  inputChange: function(e) {
    this.setState({
      inputValue: e.target.value
    }, function() {
      console.log(this.state.inputValue)
    })
  },
  doTheThing: function() {
    itemInQuestion = this.state.inputValue
    this.setState({
      result: item.parse(itemInQuestion)
    })
  },
  render: function() {
    return React.createElement('div', {},
      React.createElement('textarea', {onChange: this.inputChange, rows: 10, cols:50}),
      React.createElement('button', {onClick: this.doTheThing}, 'Do the thing!'),
      React.createElement(itemDisplayer, {item: this.state.result})
    );
  }
})
