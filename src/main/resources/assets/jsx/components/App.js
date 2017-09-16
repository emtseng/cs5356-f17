import React, { Component } from 'react'
import axios from 'axios'

import ReceiptList from './ReceiptList'
import AddReceipt from './AddReceipt'

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
  }
  componentDidMount() {
    this.getReceipts()
  }
  getReceipts() {
    axios.get(`/api/receipts`)
      .then(res => this.setState({ receipts: res.data }))
  }
  toggleAddReceipt(event) {
    event.preventDefault()
    console.log('fired toggleAddReceipt')
    this.setState({
      showAddReceipt: !this.state.showAddReceipt
    })
  }
  saveReceipt(evt, merchant, amount) {
    evt.preventDefault()
    axios.post(`/api/receipts`, { merchant, amount })
    .then(res => this.getReceipts())
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
            +
          </button>
        </div>
        {
          this.state.showAddReceipt ?
            <AddReceipt
              saveReceipt={this.saveReceipt}
              cancel={this.toggleAddReceipt} /> :
            null
        }
        <ReceiptList receipts={this.state.receipts} />
      </div>
    )
  }
}

export default App
