import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import ReceiptList from './components/ReceiptList'
import AddReceipt from './components/AddReceipt'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      receipts: [],
      showAddReceipt: false
    }
    this.toggleAddReceipt = this.toggleAddReceipt.bind(this)
    this.saveReceipt = this.saveReceipt.bind(this)
  }
  componentDidMount() {
    axios.get(`/api/receipts`)
      .then(res => this.setState({ receipts: res.data }))
  }
  toggleAddReceipt(event) {
    event.preventDefault()
    this.state.showAddReceipt ?
      this.setState({ showAddReceipt: false }) :
      this.setState({ showAddReceipt: true })
  }
  saveReceipt(event) {
    event.preventDefault()
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
          this.showAddReceipt ?
            <AddReceipt
              saveReceipt={this.saveReceipt}
              cancel={this.cancelAdd} /> :
            null
        }
        <ReceiptList receipts={this.state.receipts} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
