import React, { Component } from 'react'
import $ from 'jquery'

class SnapReceipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchant: '',
      amount: ''
    }
    this.takeSnapshot = this.takeSnapshot.bind(this)
  }
  takeSnapshot() {
    // create a CANVAS element that is same size as the image
    this.props.imageCapture.grabFrame()
      .then(img => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        // const base64EncodedImageData = canvas.toDataURL('image/png').split(',')[1];
        // $.ajax({
        //   url: "/images",
        //   type: "POST",
        //   data: base64EncodedImageData,
        //   contentType: "text/plain",
        //   success: function () { },
        // })
        //   .then(response => {
        //     $('video').after(`<div>got response: <pre>${JSON.stringify(response)}</pre></div>`);
        //   })
        //   .always(() => console.log('request complete'));
        // For debugging, you can uncomment this to see the frame that was captured
        $('BODY').append(canvas);
      });
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
            onClick={evt => this.props.saveReceiptImg(evt, this.state.merchant, this.state.amount)}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Save
        </button>
        </div>
      </div>
    )
  }
}

export default SnapReceipt
