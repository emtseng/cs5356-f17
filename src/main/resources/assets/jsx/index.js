/* global React ReactDOM */

class App extends React.Component {
  render() {
    return (
      <div id="main">
        My React works!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
