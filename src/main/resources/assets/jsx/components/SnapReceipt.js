import React, { Component } from 'react'

class SnapReceipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchant: '',
      amount: ''
    }
  }
  render() {
    return (
      <div id="receipt-snap">
        <div id="vidwrap">
          <video autoPlay></video>
        </div>
      </div>
    )
  }
}

export default SnapReceipt
