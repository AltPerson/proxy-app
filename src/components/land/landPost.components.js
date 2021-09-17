import React, { Component } from "react";

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
        console.log(items);
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
        <div
          key={id}
          className={`list__item ${
            this.props.land === post_code && "selected"
          }`}
          postcode={post_code}
          onClick={(e) => this.props.func(e.target.getAttribute("postcode"))}
        >
          {countrys}
        </div>
      );
    });
  }

  render() {
    if (!this.state.itemList) {
      return <Spinner />;
    }
    const items = this.renderItem();

    return <div className="list">{items}</div>;
  }
}
