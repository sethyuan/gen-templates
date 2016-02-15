import "./TodoList.less";

import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import flux from "simple-flux";

export default React.createClass({
  displayName: "TodoList",
  mixins: [PureRenderMixin],

  render() {
    return (
      <ul>
        {this.props.items.map(([id, item]) => {
          return (
            <li key={id}>
              <label>
                <input type="checkbox" checked={item.get("completed")}
                  onChange={this.toggleTodo.bind(this, id)}/> <span className={item.get("completed") ? "todo-item-completed" : undefined}>{item.get("text")}</span>
              </label>
            </li>
          );
        })}
      </ul>
    );
  },

  toggleTodo(id) {
    flux.dispatch("todos.toggle", {id});
  }
});
