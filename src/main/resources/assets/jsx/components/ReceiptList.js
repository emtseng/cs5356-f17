import React, { Component } from 'react'

import ReceiptTags from './ReceiptTags.js'

class ReceiptList extends Component {
  render() {
    return (
      <div id="receiptList-wrapper">
        <div id="receiptList-header">
          <div className="col-time">Time</div>
          <div className="col-merchant">Merchant</div>
          <div className="col-amt">Amount</div>
          <div className="col-tags">Tags</div>
        </div>
        <div id="receiptList">
        {
          this.props.receipts && this.props.receipts.map(receipt => (
            <div key={receipt.id} className="receipt receiptList-row" id={`receipt-row-${receipt.id}`}>
              <div className="time col-time">{receipt.created}</div>
              <div className="merchant col-merchant">{receipt.merchantName}</div>
              <div className="amount col-amt">{receipt.value}</div>
              <div className="tags col-tags">
                <ReceiptTags
                  tags={receipt.tags}
                  receiptId={receipt.id}
                  toggleTag={this.props.toggleTag}
                />
              </div>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

export default ReceiptList
