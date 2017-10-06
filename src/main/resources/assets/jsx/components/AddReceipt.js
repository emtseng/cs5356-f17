import React, { Component } from 'react'

class AddReceipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchant: this.props.merchantName,
      amount: this.props.amount
    }
    this.handleFormEntry = this.handleFormEntry.bind(this)
  }
  handleFormEntry(evt) {
    evt.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <div id="receipt-entry">
        <form>
          <input
            id="merchant"
            name="merchant"
            type="text"
            placeholder="Merchant"
            value={this.state.merchant}
            onChange={this.handleFormEntry}
          >
          </input>
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.handleFormEntry}
          >
          </input>
        </form>
        <div id="receipt-btns">
          <button
            id="cancel-receipt"
            onClick={evt => this.props.toggleAddReceipt(evt)}
          >
            <i className="fa fa-times" aria-hidden="true" />&nbsp;Cancel
          </button>
          <button
            id="save-receipt"
            className="action-btn"
            onClick={evt => this.props.saveReceipt(evt, this.state.merchant, this.state.amount)}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Save
          </button>
        </div>
      </div>
    )
  }
}

export default AddReceipt
