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
      track: ''
    }
    this.getReceipts = this.getReceipts.bind(this)
    this.toggleAddReceipt = this.toggleAddReceipt.bind(this)
    this.saveReceipt = this.saveReceipt.bind(this)
    this.toggleTag = this.toggleTag.bind(this)

    this.toggleShowCamera = this.toggleShowCamera.bind(this)
    this.initVideoStream = this.initVideoStream.bind(this)
    this.stopVideo = this.stopVideo.bind(this)
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
      showAddReceipt: !this.state.showAddReceipt
    })
  }
  initVideoStream() {
    let imageCapture;
    let track;
    function attachMediaStream(mediaStream) {
      $('video')[0].srcObject = mediaStream;
      // Saving the track allows us to capture a photo
      track = mediaStream.getVideoTracks()[0];
      imageCapture = new ImageCapture(track);
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then(attachMediaStream)
      .catch(error => {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(attachMediaStream)
          .catch(error => {
            console.log('you are fooked');
          })
      })
    this.setState({
      imageCapture, track
    })
  }
  stopVideo() {
    $('video')[0].pause();
    this.setState({
      imageCapture: '',
      track: ''
    })
  }
  toggleShowCamera(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.state.showCamera ? this.stopVideo() : this.initVideoStream()
    this.setState({
      showCamera: !this.state.showCamera
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
              toggleAddReceipt={this.toggleAddReceipt} /> :
            null
        }
        {
          this.state.showCamera ?
            <SnapReceipt
              saveReceiptImg={this.saveReceiptImg}
              toggleShowCamera={this.toggleShowCamera}
              imageCapture={this.state.imageCapture}
              track={this.state.track}  /> :
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
