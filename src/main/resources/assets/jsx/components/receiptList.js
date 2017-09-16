import React from 'react'

class ReceiptList extends React.Component {
  render() {
    return (
      <div id="receiptList">
        {
          this.props.receipts && this.props.receipts.map(receipt => (
            <div className="receipt">
              <div className="merchant">{receipt.merchantName}</div>
              <div className="amount">{receipt.value}</div>
              <div className="tags">
                {receipt.tags && receipt.tags.map(tag => (
                  <button>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ReceiptList
