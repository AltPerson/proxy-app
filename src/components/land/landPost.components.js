import React, { Component } from "react";
import { ListGroup, ListGroupItem, Row } from "reactstrap";

import proxyService from "../../services/proxy.service";
import Spinner from "../spinner/spinner.component";

import "./landPost.css";

export default class LandPost extends Component {
  proxyService = new proxyService();

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  state = {
    selectLand: null,
    itemList: null,
  };

  componentDidMount() {
    if (this.props.getLand === "USA") {
      this.proxyService.getLand("USA").then((items) => {
        let itemList = [];
        let count = 0;
        const lad = items;
        for (let i in lad) {
          itemList.push({
            countrys: lad[i],
            post_code: lad[i],
            id: count++,
          });
        }
        this.setState({
          itemList: itemList,
        });
      });
    } else {
      this.proxyService.getLand(this.props.getLand).then((items) => {
        let itemList = [];
        let count = 0;
        const lad = items;
        for (let i in lad) {
          itemList.push({
            countrys: i,
            post_code: lad[i],
            id: count++,
          });
        }
        this.setState({
          itemList: itemList,
        });
      });
    }
  }

  renderItem() {
    return this.state.itemList.map((item) => {
      const { id, countrys, post_code } = item;
      return (
        <ListGroupItem key={id} className="itemLi">
          <input
            onClick={(e) => this.props.func(e.target.value)}
            key={id}
            className="input-country"
            type="radio"
            value={post_code}
            name="gender"
          />
          {countrys}{" "}
        </ListGroupItem>
      );
    });
  }

  render() {
    if (!this.state.itemList) {
      return <Spinner />;
    }
    const items = this.renderItem();

    /* const items = this.renderItem() */
    return (
      <div className="ulWrapper">
        <ListGroup className="ulItem" horizontal>
          <Row>{items}</Row>
        </ListGroup>
      </div>
    );
  }
}
