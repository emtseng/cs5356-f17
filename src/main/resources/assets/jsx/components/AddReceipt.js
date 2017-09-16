import React, { Component } from 'react'

class AddReceipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchant: '',
      amount: ''
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
        <form
          onSubmit={evt => this.props.saveReceipt(evt, this.state.merchant, this.state.amount)}
          >
          <input
            id="merchant"
            name="merchant"
            type="text"
            value={this.state.merchant}
            onChange={this.handleFormEntry}
            >
          </input>
          <input
            id="amount"
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={this.handleFormEntry}
            >
          </input>
          <button
            id="cancel-receipt"
            onClick={evt => this.props.toggleAddReceipt(evt)}
          >
            Cancel
          </button>
          <button
            id="save-receipt"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}

export default AddReceipt
