/* global React ReactDOM */

class App extends React.Component {
  render() {
    return (
      <div id="main">
        Hello world
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
