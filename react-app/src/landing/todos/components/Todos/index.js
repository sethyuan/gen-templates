import "./Todos.less";

import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import flux from "simple-flux";
import TodoList from "../TodoList";
import Hyperlink from "Hyperlink";
import Button from "react-aaui/Button";
import Dropdown from "react-aaui/Dropdown";

export default React.createClass({
  displayName: "Todos",
  mixins: [PureRenderMixin],

  render() {
    const items = this.props.data.getIn(["todos", "items"]);
    return (
      <section className="todos">
        <h1>Hello</h1>
        <div>
          <input type="text" ref="input" placeholder="New TODO..."/> <button onClick={this.addTodo}>Add</button>
        </div>
        <TodoList items={items.entrySeq()}/>

        <Hyperlink href="/hello">Hello</Hyperlink>
        <Button type="primary" onClick={(e) => console.log(e)}>Push Me</Button>
        <Dropdown data={[{text: "Apple", value: "a"}, {text: "Banana", value: "b"}]}/>
      </section>
    );
  },

  addTodo() {
    const text = this.refs.input.value;
    this.refs.input.value = "";
    flux.dispatch("todos.add", {text});
  }
});
