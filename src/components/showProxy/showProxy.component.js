import React, { Component } from 'react';

import { Table, Button } from 'reactstrap';

import proxyService from "../../services/proxy.service";

import Spinner from "../spinner/spinner.component";

import "../modal/modal.css";



export default class ShowProxy extends Component {
    proxyService = new proxyService();

    constructor(props){
        super(props);
        this.state = {
            modalClass: "modal-closed",
            proxysList: null,
            sellProxy: null,
        }
        this.modalOnRent = this.modalOnRent.bind(this);
        this.modalOnBuy = this.modalOnBuy.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
        /* this.buyBtn = this.buyBtn.bind(this); */
    }

    componentDidMount(){
        console.log("SEARCH...")
        const {Zip, City, proxyLand, selectLand, typeIp, blacklist} = this.props
        /* console.log("Zip: " + Zip + "City: " + City + "proxyland: " + proxyLand + "selectLand: " + selectLand + "typeIp: " + typeIp + "blacklist: " + blacklist) */
        this.proxyService.getContinent(proxyLand, typeIp, blacklist, City, Zip, selectLand)
        .then((proxys) => {
            console.log(proxys)
            const prox = proxys.data;
            console.log(prox);
            let proxyList = []
            for(let i in prox){
                proxyList.push({
                    real_ip: prox[i].real_ip,
                    domain: prox[i].domain,
                    id: prox[i].id,
                    city: prox[i].city,
                    isp: prox[i].isp,
                    speed: prox[i].speed,
                    zip: prox[i].zip,
                    region: prox[i].region,
                    typename: prox[i].typename,
                    price: prox[i].price,
                    rent_price: prox[i].rent_price,
                })
            } 
          this.setState({
            proxysList: proxyList
          })
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps, prevProps){
        let btn = true
        console.log(btn)
        if (btn !== nextProps.clickBTN){
            console.log(nextProps.clickBTN)
            btn = !btn
            console.log(btn)
            this.setState({
                proxysList: null
            })
            this.componentDidMount()
        }
    }

    modalOnRent(id) {
        this.setState({modalClass: "modal-open"});
        this.proxyService.buyProxy(id)
            .then((sell) => {
                if(sell.MESSAGE === "insufficient funds"){
                    this.setState({sellProxy: sell.MESSAGE})
                } else{
                    this.setState({sellProxy: sell.CART[0].value})
                }
            })
        console.log("on");
    }

    modalOnBuy(id) {
        this.setState({modalClass: "modal-open"});
        this.proxyService.buyProxy(id)
            .then((sell) => {
                if(sell.MESSAGE === "insufficient funds"){
                    this.setState({sellProxy: sell.MESSAGE})
                } else{
                    this.setState({sellProxy: sell.CART[0].value})
                }
            })
        console.log("on");
    }

    modalClosed() {
        this.setState({modalClass: "modal-closed"});
        console.log("closed");
    }

    showSellProxy() {
        if(this.state.sellProxy === null){
            return <Spinner/>
        } else if (this.state.sellProxy === "insufficient funds"){
            return (
                <div>You don't have enought money!!!</div>
            )
        }
        return(
            <div>
                <span className="label">Your proxy: </span>
                <input className="sellIpInput" defaultValue ={this.state.sellProxy}></input>
            </div>
        ) /* "Your proxy: " + this.state.sellProxy; */
    }


    tableRender(){
        return this.state.proxysList.map((item) => {
            const {real_ip, domain, id, city, isp, speed, zip, region, typename, rent_price, price} = item;

            return(
                <tr key={id}
                    className="proxyItem">
                    <th scope="row">{real_ip}</th>
                    <td>{domain}</td>
                    <th>{city}</th>
                    <td>{isp}</td>
                    <td>{speed}</td>
                    <td>{zip}</td>
                    <td>{region}</td>
                    <td>{typename}</td>
                    <td>
                        <div className="buyBtn">
                            <Button 
                            onClick={() => {this.modalOnRent(id)}}  
                            className="priceBtnRent"  
                            style={{ width: "80px"}} 
                            color="primary" 
                            size="lg">
                                {rent_price}$
                            </Button>{' '}
                            <Button 
                            onClick={() => {this.modalOnBuy(id)}}  
                            className="priceBtnBuy"  
                            style={{ width: "80px"}} 
                            color="primary" 
                            size="lg">
                                {price}$
                            </Button>{' '}
                            <div id="myModal" className={this.state.modalClass}>
                                    <div className="modal-content">
                                        <span onClick={() => {this.modalClosed()}} className="close">&times;</span>
                                        <span className="closeText">{this.showSellProxy()}</span>
                                    </div>
                            </div>
                        </div>
                    </td>
                </tr> 
            )
        }
    )}

    
    render(){
            /* this.searchProxy(); */
            if(!this.state.proxysList){
                return(
                    <Spinner/>
                )
            }

            const items = this.tableRender();
            return(
                <div className="proxyWrapper">
                    <Table 
                    className="proxyItem"
                    striped>
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Domain</th>
                            <th>City</th>
                            <th>ISP</th>
                            <th>Speed</th>
                            <th>ZIP</th>
                            <th>Region</th>
                            <th>Type</th>
                            <th>Buy/Buy back</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                    </Table>
                </div>
            )
    }
}

