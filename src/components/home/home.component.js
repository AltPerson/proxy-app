import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, Button, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledButtonDropdown, Form, Row, Label, Col, FormGroup, Input} from 'reactstrap';
import LandPost from "../land/landPost.components";
import ShowProxy from "../showProxy/showProxy.component";

import searchimg from "../search-worldwide.png"

import proxyService from "../../services/proxy.service";

import "./home.css"

export default class Proxy extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      activeTab: '1',
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
      typeIpValue: "all"
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

  updateService(){
    const country = "america";
    this.proxyService.getLand(country)
    .then((land) =>{
      const lad = land
      let buff = [];
      for(let i in lad){
        buff.push({
          [i]: lad[i],
          id: this.maxId++
        })
      }
      this.setState(({lands}) => {
        return {
            lands: buff 
        }
      }) 
    })
  }

  propsTest(){
    console.log(this.state.selectLand/* радіо-бтн */ + " " + this.state.typeIpValue + " " + this.state.proxyLand /* верхня кнопка {usa, africa, ...}*/ + " Blacklist: " + this.state.blacklistValue + "City: " + this.state.City + "Zip: " + this.state.Zip);
  }

  updateCity(e){
    const term = e.target.value;
    term === "" ? this.setState({City: "all"}) : this.setState({City: term})
  }

  updateZIP(e){
    const term = e.target.value;
    term === "" ? this.setState({Zip: "all"}) : this.setState({Zip: term})
  }

  toggle(tab, land) {
    if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab,
            proxyLand: land
        });
    }
  }

  getSpinner(data){
      if(data === true){
        this.setState({disabledBtn: true})
      } 
      if(data === false) {
        this.setState({disabledBtn: false})
      }
  }

  searchBtn(toogle){
    if(this.state.searchProxy === toogle){
      this.setState({
        showImg: false,
        clickBTN: !this.state.clickBTN,
        disabledBtn: true
      })
    }
    const {blacklist, typeIp, selectLand, proxyLand, City, Zip, clickBTN} = this.state
    return (
      <ShowProxy
          getSpinner = {this.getSpinner}
          clickBTN = {clickBTN}
          blacklist = {blacklist}
          typeIp = {typeIp}
          selectLand = {selectLand} 
          proxyLand = {proxyLand}
          City = {City}
          Zip = {Zip}
        /> 
    );
  }

  prstFunc(data) {
    this.setState({ selectLand: data });
  }

  render() {

    const proxList = this.searchBtn();
    
    return(
      <div>
      <Nav tabs>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '1'} onClick={() => { this.toggle('1', "USA"); }}>
            USA
          </Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '2'} onClick={() => { this.toggle('2', "europe"); }}>
            EU
          </Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '3'} onClick={() => { this.toggle('3', "america"); }}>
            AMERIKA
          </Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '4'} onClick={() => { this.toggle('4', "russia"); }}>
            RUSSIA
          </Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '5'} onClick={() => { this.toggle('5', "asia"); }}>
            ASIA
          </Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className='mr-2' active={this.state.activeTab === '6'} onClick={() => { this.toggle('6', "africa`"); }}>
            AFRICA
          </Button>
        </NavItem>
      </Nav>
      <TabContent className="tabContent" activeTab={this.state.activeTab}>
        <TabPane tabId="1">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "USA"
            />
        </TabPane>
        <TabPane tabId="2">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "europe"
            />
        </TabPane>
        <TabPane tabId="3">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "america"
            />
        </TabPane>
        <TabPane tabId="4">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "russia"
            />
        </TabPane>
        <TabPane tabId="5">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "asia"
            />
        </TabPane>
        <TabPane tabId="6">
            <LandPost
              func={this.prstFunc.bind(this)}
              getLand = "africa"
            />
        </TabPane>
      </TabContent>
      <hr/>
      <UncontrolledButtonDropdown>
      <DropdownToggle caret className="typeIp">
        IP type - {this.state.typeIp}
      </DropdownToggle>
      <DropdownMenu>   
        <DropdownItem value="all">
          <div onClick={() => this.setState({
            typeIpValue: "all",
            typeIp: "all"
          })}>all</div>
        </DropdownItem>    
        <DropdownItem value="Residential">
          <div onClick={() => this.setState({
            typeIpValue: "Residential",
            typeIp: "Residential"
          })}>Residential</div>
        </DropdownItem>
        <DropdownItem value="Datacenter/hosting">
          <div onClick={() => this.setState({
            typeIpValue: "Datacenter/hosting",
            typeIp: "Datacenter/hosting"
          })}>Datacenter/hosting</div>
        </DropdownItem>
        <DropdownItem value="5">
          <div onClick={() => this.setState({
            typeIpValue: "5",
            typeIp: "Android(Mobile)"
          })}>Android(Mobile)</div>
        </DropdownItem>
        <DropdownItem value="6">
          <div onClick={() => this.setState({
            typeIpValue: "6",
            typeIp: "Router"
          })}>Router</div> 
        </DropdownItem>
        <DropdownItem value="8">
          <div onClick={() => this.setState({
            typeIpValue: "8",
            typeIp: "Linux"
          })}>Linux</div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
    <UncontrolledButtonDropdown>
      <DropdownToggle caret className="typeIp">
        Blacklists - Show {this.state.blacklist}
      </DropdownToggle>
      <DropdownMenu>   
        <DropdownItem dropdownvalue="6">
          <div onClick={() => this.setState({
            blacklistValue: 6,
            blacklist: "all"
          })}>all</div> 
        </DropdownItem>    
        <DropdownItem dropdownvalue="6">
          <div onClick={() => this.setState({
            blacklistValue: 6,
            blacklist: "Clean"
          })}>Clean</div> 
        </DropdownItem>
        <DropdownItem dropdownvalue="7">
          <div onClick={() => this.setState({
            blacklistValue: 7,
            blacklist: "Extra clean"
          })}>Extra clean</div> 
        </DropdownItem>
        <DropdownItem dropdownvalue="8">
          <div onClick={() => this.setState({
            blacklistValue: 8,
            blacklist: "Black 50% OFF"
          })}>Black 50% OFF</div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
    <Button onClick={() => {this.propsTest()}}>Test</Button>
    <hr/>
    <Form>
      <Row form>
        <Col md={6}>
        <Label for="exampleCity">City</Label>
        </Col>
        <Col md={4}>
        <Label for="exampleZip">Zip</Label>
        </Col>
        <Col md={2}>
        
        </Col>
        <Col md={6}>
          <FormGroup>
            <Input 
            key="city"
            type="text" 
            name="city" 
            id="City"
            onChange={this.updateCity}/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Input 
            key="zip"
            type="text" 
            name="zip" 
            id="Zip"
            onChange={this.updateZIP}/>
          </FormGroup>  
        </Col>
        <Col md={2}>
          <Button 
            onClick={() => { this.searchBtn(false);}}
            disabled={this.state.disabledBtn}
            >Search Proxy{this.state.disabledBtn ? <span className="spinner-border spinner-border-sm"></span> : " "}</Button>
        </Col>
      </Row>
    </Form>
    {this.state.showImg && !this.state.showSpiner ? (
    <>
      <hr/>
      <img style={{ width: "170px", display: "block", margin: "0 auto"}} src={searchimg} alt="search"></img>
    </>):
    (
      <div>
        {proxList}
      </div>
    )
    }
    </div>
    );
  }
}

