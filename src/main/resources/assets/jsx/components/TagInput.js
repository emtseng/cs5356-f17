import React, { Component } from 'react'

class TagInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
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
    this.props.removeTagInput(evt)
  }
  render() {
    return (
      <div className="tag-input-wrapper">
        <input
          className="tag_input"
          placeholder="New tag"
          value={this.state.value}
          onKeyPress={evt => {
            if (evt.key === 'Enter') {
              this.handleTagSubmit(evt)
            }
          }}
          onChange={this.handleKeyChange}
        />
        <div
          className="tag_cancel"
          onClick={this.props.removeTagInput}
        >
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
    )
  }
}

export default TagInput
