import React, { Component } from 'react'

import TagInput from './TagInput.js'

class ReceiptTags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagInputs: []
    }
    this.handleAddTag = this.handleAddTag.bind(this)
    this.removeTagInput = this.removeTagInput.bind(this)
  }
  removeTagInput(evt) {
    evt.preventDefault()
    console.log(evt.target)
    this.setState({ tagInputs: [] })
  }
  handleAddTag(evt) {
    evt.preventDefault()
    this.setState({ tagInputs: this.state.tagInputs.concat([
      <TagInput
        toggleTag={this.props.toggleTag}
        removeTagInput={this.removeTagInput}
        receiptId={this.props.receiptId}
      />
    ]) })
  }
  render() {
    return (
      <div className="receipt-tags">
        {
          this.props.tags && this.props.tags.map(tag => (
            <div
              className="tagValue"
              key={tag}
              onClick={evt => this.props.toggleTag(evt, tag, this.props.receiptId)}
            >
              {tag} <i className="fa fa-times" aria-hidden="true" />
            </div>
          ))
        }
        {
          this.state.tagInputs && this.state.tagInputs.map(tagInput => (
            tagInput
          ))
        }
        <div
          className="add-tag action-btn"
          onClick={this.handleAddTag}
        >
          <i className="fa fa-tag" aria-hidden="true" />&nbsp;Add Tag
        </div>
      </div>
    )
  }
}

export default ReceiptTags
