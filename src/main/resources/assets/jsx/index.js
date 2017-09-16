import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import ReceiptList from './components/receiptList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      receipts: []
    }
  }
  componentDidMount() {
    axios.get(`/api/receipts`)
    .then(res => this.setState({receipts: res.data}))
  }
  render() {
    return (
      <div id="main">
        My React works!
        <ReceiptList receipts={this.state.receipts} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
