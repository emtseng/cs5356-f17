import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'

import AddReceipt from './AddReceipt.js'
import ReceiptList from './ReceiptList.js'
import SnapReceipt from './SnapReceipt.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receipts: [],
      showAddReceipt: false,
      showCamera: false,
      imageCapture: '',
      merchantName: '',
      amount: ''
    }
    this.getReceipts = this.getReceipts.bind(this)
    this.toggleAddReceipt = this.toggleAddReceipt.bind(this)
    this.saveReceipt = this.saveReceipt.bind(this)
    this.toggleTag = this.toggleTag.bind(this)

    this.toggleShowCamera = this.toggleShowCamera.bind(this)
    this.attachMediaStream = this.attachMediaStream.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this)
  }
  componentDidMount() {
    this.getReceipts()
  }
  getReceipts() {
    axios.get(`/api/receipts`)
      .then(res => this.setState({ receipts: res.data }))
  }
  toggleAddReceipt(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({
      showAddReceipt: !this.state.showAddReceipt,
    })
  }
  attachMediaStream(mediaStream) {
    $('video')[0].srcObject = mediaStream;
    // Saving the track allows us to capture a photo
    var track = mediaStream.getVideoTracks()[0];
    var imageCapture = new ImageCapture(track);
    this.setState({
      imageCapture
    })
  }
  toggleShowCamera(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    if (this.state.showCamera) {
      $('video')[0].pause();
      this.setState({
        showCamera: false,
        imageCapture: '',
      })
    } else {
      this.setState({
        showCamera: true
      })
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
        .then(this.attachMediaStream)
        .catch(error => {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(this.attachMediaStream)
            .catch(error => {
              console.log('you are fooked');
            })
        })
    }
  }
  takeSnapshot(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    // create a CANVAS element that is same size as the image
    this.state.imageCapture.grabFrame()
      .then(img => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        const base64EncodedImageData = canvas.toDataURL('image/png').split(',')[1];
        axios.post('/api/images', base64EncodedImageData, {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
          .then(res => {
            console.log(res.data)
            this.setState({
              merchantName: res.data.merchantName,
              amount: res.data.amount,
              showAddReceipt: true,
              showCamera: false
            })
          })
          .catch(console.error)
        //$('BODY').append(canvas);
      })
  }
  saveReceipt(evt, merchant, amount) {
    evt.preventDefault()
    evt.stopPropagation()
    axios.post(`/api/receipts`, { merchant, amount })
      .then(res => this.getReceipts())
      .then(() => this.setState({ showAddReceipt: false }))
      .catch(err => console.error(err))
  }
  toggleTag(evt, tag, receiptId) {
    evt.preventDefault()
    axios.put(`/api/tags/${tag}`, JSON.stringify(receiptId), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this.getReceipts())
      .catch(err => console.error(err))
  }
  render() {
    return (
      <div id="main">
        <div id="head">
          <h1>My Receipts</h1>
          {
            this.state.showAddReceipt ?
              (<button
                onClick={evt => this.toggleAddReceipt(evt)}
                id="add-receipt"
                className="action-btn"
              >
                <i className="fa fa-caret-up" aria-hidden="true" />&nbsp;Collapse
              </button>
              ) :
              (
                <button
                  onClick={evt => this.toggleAddReceipt(evt)}
                  id="add-receipt"
                  className="action-btn"
                >
                  <i className="fa fa-plus" aria-hidden="true" />&nbsp;Add Receipt
                </button>
              )
          }
          {
            this.state.showCamera ?
              (
                <button
                  onClick={evt => this.toggleShowCamera(evt)}
                  id="start-camera"
                  className="action-btn"
                >
                  <i className="fa fa-caret-up" aria-hidden="true" />&nbsp;Collapse
              </button>
              ) :
              (
                <button
                  onClick={evt => this.toggleShowCamera(evt)}
                  id="start-camera"
                  className="action-btn"
                >
                  <i className="fa fa-camera" aria-hidden="true" />&nbsp;Show Camera
                </button>
              )
          }
        </div>
        {
          this.state.showAddReceipt ?
            <AddReceipt
              saveReceipt={this.saveReceipt}
              toggleAddReceipt={this.toggleAddReceipt}
              merchantName={this.state.merchantName}
              amount={this.state.amount} /> :
            null
        }
        {
          this.state.showCamera ?
            <SnapReceipt
              takeSnapshot={this.takeSnapshot}
              toggleShowCamera={this.toggleShowCamera} /> :
            null
        }
        <ReceiptList
          receipts={this.state.receipts}
          toggleTag={this.toggleTag}
        />
      </div>
    )
  }
}

export default App
