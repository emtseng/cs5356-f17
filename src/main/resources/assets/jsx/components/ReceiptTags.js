import React, { Component } from 'react'
import axios from 'axios'

import TagInput from './TagInput'

class ReceiptTags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagInputs: []
    }
    this.handleAddTag = this.handleAddTag.bind(this)
  }
  handleAddTag(evt) {
    evt.preventDefault()
    this.setState({ tagInputs: this.state.tagInputs.concat([
      <TagInput
        toggleTag={this.props.toggleTag}
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
          className="btn-add-tag"
          onClick={this.handleAddTag}
        >
          Add Tag
        </div>
      </div>
    )
  }
}

export default ReceiptTags
