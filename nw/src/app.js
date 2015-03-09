const gui = require("nw.gui");
const menubar = new gui.Menu({type: "menubar"});
menubar.createMacBuiltin("{{{displayName}}}");
gui.Window.get().menu = menubar;

global.React = React;

const Header = require("./js/components/header");

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <section className="appContentContainer">
          <h1>Hello World</h1>
        </section>
      </div>
    );
  }
});

React.render(<App />, document.body);

// Remove the following before release.
const gulp = require("gulp");
gulp.task("reload", function() {
  if (location) location.reload();
});
gulp.watch("**/*", ["reload"]);
