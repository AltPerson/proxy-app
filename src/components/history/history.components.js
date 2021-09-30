import React, { Component } from 'react';

import { Table, Button } from 'reactstrap';

import Spinner from "../spinner/spinner.component";

import proxyService from "../../services/proxy.service";

import logo from "../logo.png"

import "./history.css";
import "../modal/modal.css";

export default class History extends Component {

    proxyService = new proxyService();

    constructor(props){
        super(props);
        this.showHistory();
        this.modalOnRefaund = this.modalOnRefaund.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
    }

    state = {
        historyList: null, 
        modalClass: "modal-closed",
        refaundProxy: null,
    }

    componentDidMount() {
        document.title = 'History';
    }

    //Modal to ressel

    modalOnResell(ip){
        console.log("on")
        this.setState({modalClass: "modal-open"});
        this.proxyService.resellProxy(ip)
            .then((ref) => {
                console.log(ref);
                this.setState({refaundProxy: ip})
            })
    }

    modalClosed() {
        this.setState({modalClass: "modal-closed"});
        console.log("closed");
    }

    showMsgResell(){
        if(this.state.refaundProxy === null){
            return <Spinner/>
        } 

        return(
            <div>
                <span className="label">Congradulation! Your proxy: </span>
                <input className="sellIpInput" defaultValue ={this.state.refaundProxy}></input>
                <span className="label"> is refaund</span>
            </div>
        )
    }

    //Finish ressel modal

    //Modal to refaund

    modalOnRefaund(ip){

    }

    renderHistoryTable() {
        return this.state.historyList.map((item) => {
            const {date, city, typename, proxy, region, id, price} = item;

            return(
                <tr key={id}
                    className="historyItem">
                    <th scope="row">{date}</th>
                    <td>{city}</td>
                    <td>{typename}</td>
                    <td>{proxy}</td>
                    <td>{region}</td>
                    <td>{price} $</td>
                    <td>
                        <Button 
                        onClick={() => {this.modalOnResell(proxy)}}  
                        className="refBtn"  
                        style={{ width: "80px", height: "55px"}} 
                        color="primary" 
                        size="lg">
                            {price}$
                        </Button>{' '}
                        <div id="myModal" className={this.state.modalClass}>
                            <div className="modal-content"
                                  style={{width: "45%"}}>
                                <span onClick={() => {this.modalClosed()}} className="close">&times;</span>
                                <span className="closeText">{this.showMsgResell()}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <Button 
                        /* onClick={() => {this.modalOnRent(id)}}  */ 
                        className="refBtn"  
                        style={{ width: "80px", fontSize: "10px", height: "55px"}} 
                        color="primary" 
                        size="lg">
                            REFAUND
                        </Button>{' '}
                       {/*  <div id="myModal" className={this.state.modalClass}>
                            <div className="modal-content"
                                  style={{width: "45%"}}>
                                <span onClick={() => {this.modalClosed()}} className="close">&times;</span>
                                <span className="closeText">{this.showMsgRef()}</span>
                            </div>
                        </div> */}
                    </td>
                </tr>
            )
        })
    }

    showHistory(){
        this.proxyService.historyProxy()
        .then((history) => {
            console.log(history);
            let historyList = []
            for(let i in history){
                historyList.push({
                    city: history[i].city,
                    date: history[i].date,
                    typename: history[i].typename,
                    proxy: history[i].proxy,
                    region: history[i].region,
                    id: history[i].id,
                    price: history[i].ammount,
                })
            }
            console.log(historyList);
            this.setState({
                historyList: historyList
            })
        })
    }

    render() {
        if(!this.state.historyList){
            return(
                <>
                    <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
                    <div>
                        <Spinner/>
                    </div>
                </>
            )
        }

        const items = this.renderHistoryTable();
        return(
            <div className="historyWrapper">
                <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
                <Table
                className="historyItem"
                striped>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>City</th>
                        <th>Region</th>
                        <th>Type</th>
                        <th>Proxy</th>
                        <th>Price</th>
                        <th>Extend</th>
                        <th>Refaund</th>
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

