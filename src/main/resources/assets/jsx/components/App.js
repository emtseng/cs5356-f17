import React, { Component } from 'react'
import axios from 'axios'

import ReceiptList from './ReceiptList.js'
import AddReceipt from './AddReceipt.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receipts: [],
      showAddReceipt: false
    }
    this.getReceipts = this.getReceipts.bind(this)
    this.toggleAddReceipt = this.toggleAddReceipt.bind(this)
    this.saveReceipt = this.saveReceipt.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
  }
  componentDidMount() {
    this.getReceipts()
  }
  getReceipts() {
    axios.get(`/api/receipts`)
      .then(res => this.setState({ receipts: res.data }))
  }
  toggleAddReceipt(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({
      showAddReceipt: !this.state.showAddReceipt
    })
  }
  saveReceipt(evt, merchant, amount) {
    evt.preventDefault()
    evt.stopPropagation()
    axios.post(`/api/receipts`, { merchant, amount })
      .then(res => this.getReceipts())
      .then(() => this.setState({ showAddReceipt: false }))
      .catch(err => console.error(err))
  }
  toggleTag(evt, tag, receiptId) {
    evt.preventDefault()
    axios.put(`/api/tags/${tag}`, JSON.stringify(receiptId), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this.getReceipts())
      .catch(err => console.error(err))
  }
  render() {
    return (
      <div id="main">
        <div id="head">
          <h1>My Receipts</h1>
          <button
            onClick={evt => this.toggleAddReceipt(evt)}
            id="add-receipt"
          >
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
        {
          this.state.showAddReceipt ?
            <AddReceipt
              saveReceipt={this.saveReceipt}
              cancel={this.toggleAddReceipt} /> :
            null
        }
        <ReceiptList
          receipts={this.state.receipts}
          toggleTag={this.toggleTag}
        />
      </div>
    )
  }
}

export default App
