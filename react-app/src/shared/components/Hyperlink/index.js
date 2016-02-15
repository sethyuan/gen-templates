import React from "react";
import router from "router";

export default React.createClass({
  displayName: "Hyperlink",

  render() {
    return (
      <a {...this.props}
        href={(!router.history ? "#" : "") + this.props.href}
        onClick={router.history ? this.pushHistory : undefined}>{this.props.children}</a>
    );
  },

  pushHistory(e) {
    e.preventDefault();
    router.setRoute(this.props.href);
  }
});
