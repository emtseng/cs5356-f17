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
        <div id="receipt-btns">
          <button
            id="take-pic-cancel"
            onClick={evt => this.props.toggleShowCamera(evt)}
          >
            <i className="fa fa-times" aria-hidden="true" />&nbsp;Cancel
        </button>
          <button
            id="take-pic"
            className="action-btn"
            onClick={evt => this.props.takeSnapshot(evt)}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Snap
        </button>
        </div>
      </div>
    )
  }
}

export default SnapReceipt
