require("./app.less");

const React = require("react");

const App = React.createClass({
  render() {
    return (
      <div className="appContainer">
        <h1>Hello World</h1>
      </div>
    );
  }
});

React.render(<App />, document.body);
