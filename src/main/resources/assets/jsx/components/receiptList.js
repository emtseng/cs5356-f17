import React from 'react'

class ReceiptList extends React.Component {
  render() {
    return (
      <table id="receiptList">
        <tr>
          <th>Time</th>
          <th>Merchant</th>
          <th>Amount</th>
          <th>Tags</th>
        </tr>
        {
          this.props.receipts && this.props.receipts.map(receipt => (
            <tr className="receipt">
              <td className="time">{receipt.created}</td>
              <td className="merchant">{receipt.merchantName}</td>
              <td className="amount">{receipt.value}</td>
              <td className="tags">
                {receipt.tags && receipt.tags.map(tag => (
                  <button>
                    {tag}
                  </button>
                ))}
              </td>
            </tr>
          ))
        }
      </table>
    )
  }
}

export default ReceiptList
