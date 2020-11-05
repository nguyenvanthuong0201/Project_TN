import React, { Component } from "react";
import { Badge, Button, Switch } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const ButtonGroup = Button.Group;
class HomeCart extends Component {
  state = {
    count: 5,
    show: true,
  };

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };

  onChange = (show) => {
    this.setState({ show });
  };
  render() {
    return (
      <div>
        <div>
          <Badge count={this.state.count}>
            <a href="#" className="head-example" />
          </Badge>
        </div>
      </div>
    );
  }
}

export default HomeCart;
