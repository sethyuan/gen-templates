import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

import "./Root.less";

export default React.createClass({
  displayName: "Root",
  mixins: [PureRenderMixin],

  render() {
    const Module = this.props.view;
    return (
      <Module data={this.props.data}/>
    );
  },
});
