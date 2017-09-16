import React from 'react'
import $ from 'jquery'
import axios from 'axios'

import ReceiptTags from './ReceiptTags'

class ReceiptList extends React.Component {
  constructor(props) {
    super(props)
    this.addTag = this.addTag.bind(this)
  }
  addTag(evt, id) {
    evt.preventDefault()
    $(`#tag_input-${id}`).show();
  }
  render() {
    return (
      <table id="receiptList">
        <tbody>
          <tr>
            <th>Time</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Tags</th>
          </tr>
          {
            this.props.receipts && this.props.receipts.map(receipt => (
              <tr key={receipt.id} className="receipt" id={`receipt-row-${receipt.id}`}>
                <td className="time">{receipt.created}</td>
                <td className="merchant">{receipt.merchantName}</td>
                <td className="amount">{receipt.value}</td>
                <td className="tags">
                  <ReceiptTags
                    tags={receipt.tags}
                    receiptId={receipt.id}
                    toggleTag={this.props.toggleTag}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default ReceiptList
