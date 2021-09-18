import React, { Component } from "react";
import { buttonsData, dropDownValueLeft, dropDownValueRight } from "./data";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  Form,
  Row,
  Label,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
import LandPost from "../land/landPost.components";
import ShowProxy from "../showProxy/showProxy.component";

import searchimg from "../search-worldwide.png";

import proxyService from "../../services/proxy.service";

import "./home.css";

export default class Proxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      city: null,
      isp: null,
      speed: null,
      zip: null,
      region: null,
      typename: null,
      lands: [],
      showImg: true,
      clickBTN: false,
      disabledBtn: false,
      redirectState: null,
      searchProxy: false, //state який міняє картінку на спінер коли іде поіск проксі
      Zip: "all",
      City: "all",
      proxyLand: "USA",
      selectLand: "all",
      typeIp: "all",
      blacklist: "all",
      blacklistValue: 6,
      valueType: "Residential",
      typeIpValue: "all",
    };
    this.updateService();
    this.toggle = this.toggle.bind(this);
    this.updateService = this.updateService.bind(this);
    this.maxId = 0;
    this.searchBtn = this.searchBtn.bind(this);
    this.propsTest = this.propsTest.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateZIP = this.updateZIP.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
  }

  proxyService = new proxyService();

  updateService() {
    const country = "america";
    this.proxyService.getLand(country).then((land) => {
      const lad = land;
      let buff = [];
      for (let i in lad) {
        buff.push({
          [i]: lad[i],
          id: this.maxId++,
        });
      }
      this.setState(({ lands }) => {
        return {
          lands: buff,
        };
      });
    });
  }

  propsTest() {
    console.log(
      this.state.selectLand /* радіо-бтн */ +
        " " +
        this.state.typeIpValue +
        " " +
        this.state.proxyLand /* верхня кнопка {usa, africa, ...}*/ +
        " Blacklist: " +
        this.state.blacklistValue +
        "City: " +
        this.state.City +
        "Zip: " +
        this.state.Zip
    );
  }

  updateCity(e) {
    const term = e.target.value;
    term === ""
      ? this.setState({ City: "all" })
      : this.setState({ City: term });
  }

  updateZIP(e) {
    const term = e.target.value;
    term === "" ? this.setState({ Zip: "all" }) : this.setState({ Zip: term });
  }

  toggle(tab, land) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        proxyLand: land,
      });
    }
  }

  getSpinner(data) {
    if (data === true) {
      this.setState({ disabledBtn: true });
    }
    if (data === false) {
      this.setState({ disabledBtn: false });
    }
  }

  searchBtn(toogle) {
    if (this.state.searchProxy === toogle) {
      this.setState({
        showImg: false,
        clickBTN: !this.state.clickBTN,
        disabledBtn: true,
      });
    }
    const { blacklist, typeIp, selectLand, proxyLand, City, Zip, clickBTN } =
      this.state;
    return (
      <ShowProxy
        getSpinner={this.getSpinner}
        clickBTN={clickBTN}
        blacklist={blacklist}
        typeIp={typeIp}
        selectLand={selectLand}
        proxyLand={proxyLand}
        City={City}
        Zip={Zip}
      />
    );
  }

  setLand(data = "all") {
    this.setState({ selectLand: data });
  }

  render() {
    const proxList = this.searchBtn();

    return (
      <div>
        <Nav tabs>
          {buttonsData.map((item) => {
            return (
              <NavItem key={item.id}>
                <Button
                  color="primary"
                  className="mr-2"
                  active={this.state.activeTab === item.id}
                  onClick={() => {
                    this.setLand();
                    this.toggle(item.id, item.value);
                  }}
                >
                  {item.name}
                </Button>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent
          className="tabContent mb-3"
          activeTab={this.state.activeTab}
        >
          {buttonsData.map((item) => {
            return (
              <TabPane key={item.id} tabId={item.id}>
                <LandPost
                  setLand={this.setLand.bind(this)}
                  land={this.state.selectLand}
                  getLand={item.value}
                />
              </TabPane>
            );
          })}
        </TabContent>
        <UncontrolledButtonDropdown>
          <DropdownToggle caret className="typeIp">
            IP type - {this.state.typeIp}
          </DropdownToggle>
          <DropdownMenu>
            {dropDownValueLeft.map((item) => {
              return (
                <DropdownItem
                  key={item.id}
                  value={item.value}
                  onClick={() =>
                    this.setState({
                      typeIpValue: item.value,
                      typeIp: item.name,
                    })
                  }
                >
                  {item.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <UncontrolledButtonDropdown>
          <DropdownToggle caret className="typeIp">
            Blacklists - Show {this.state.blacklist}
          </DropdownToggle>
          <DropdownMenu>
            {dropDownValueRight.map((item) => {
              return (
                <DropdownItem
                  key={item.id}
                  value={item.value}
                  onClick={() =>
                    this.setState({
                      blacklistValue: item.value,
                      blacklist: item.name,
                    })
                  }
                >
                  {item.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Button
          onClick={() => {
            this.propsTest();
          }}
        >
          Test
        </Button>
        <hr />
        <Form>
          <Row form>
            <Col md={6}>
              <Label for="exampleCity">City</Label>
            </Col>
            <Col md={4}>
              <Label for="exampleZip">Zip</Label>
            </Col>
            <Col md={2}></Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  key="city"
                  type="text"
                  name="city"
                  id="City"
                  onChange={this.updateCity}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Input
                  key="zip"
                  type="text"
                  name="zip"
                  id="Zip"
                  onChange={this.updateZIP}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button
                onClick={() => {
                  this.searchBtn(false);
                }}
                disabled={this.state.disabledBtn}
              >
                Search Proxy
                {this.state.disabledBtn ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  " "
                )}
              </Button>
            </Col>
          </Row>
        </Form>
        {this.state.showImg && !this.state.showSpiner ? (
          <>
            <hr />
            <img
              style={{ width: "170px", display: "block", margin: "0 auto" }}
              src={searchimg}
              alt="search"
            ></img>
          </>
        ) : (
          <div>{proxList}</div>
        )}
      </div>
    );
  }
}
