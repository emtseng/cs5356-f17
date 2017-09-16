import React, { Component } from 'react'

class TagInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'New tag'
    }
    this.handleKeyChange = this.handleKeyChange.bind(this)
    this.handleTagSubmit = this.handleTagSubmit.bind(this)
  }
  handleKeyChange(evt) {
    evt.preventDefault()
    this.setState({
      value: evt.target.value
    })
  }
  handleTagSubmit(evt) {
    evt.preventDefault()
    this.props.toggleTag(evt, this.state.value, this.props.receiptId)
    this.props.removeTagInput()
  }
  render() {
    return (
      <input
        className="tag_input"
        value={this.state.value}
        onKeyPress={evt => {
          if (evt.key === 'Enter') {
            this.handleTagSubmit(evt)
          }
        }}
        onChange={this.handleKeyChange}
      />
    )
  }
}

export default TagInput
