import React, { useState } from 'react';
import { Container, Button } from "reactstrap";

import { buttonsQIWI } from "./data";

import "./donate.css";

import bitcoin from "./img/bitcoin.png"
import ether from "./img/ethr.png"
import dash from "./img/dash.png"
import lite from "./img/lite.png"
import doge from "./img/doge.png"
import visa from "./img/visa.png"
import qiwi from "./img/qiwi.png"
import yandex from "./img/yandex.png"

export default function Donate() {

    const [ qiwiValue, setqiwiValue ] = useState(0 + ".00");
    const [ cardValue, setCardValue ] = useState(0 + ".00");
    const [ cryptoValue, setCryptoValue ] = useState(0 + ".00");

    const handlerQIWi = (e) => {
        let newMsg = e.currentTarget.value
        setqiwiValue(newMsg)
    }

    const handlerCard = (e) => {
        let newMsg = e.currentTarget.value
        setCardValue(newMsg)
    }

    const handlerCrypto = (e) => {
        let newMsg = e.currentTarget.value
        setCryptoValue(newMsg)
    } 

    const onClickHandler = (e) => {
        let click = e.currentTarget.id
        console.log(click);
    }
    

    return(
        <Container>
            <div className="wrapper">
                <div className="donat-header">Donate</div>
                <hr style={{margin: "0"}}/>
                <div className="donat-body">

                    <div className="qiwi-wrapper donat-card">
                        <div className="donat-card_header">Qiwi/Yandex</div>
                        {buttonsQIWI.map((item) => {
                            if(item.emoji === null)
                                return (<Button color="info" key={item.id} id={item.id} onClick={onClickHandler} className="donate-btn_country">{item.name}</Button>)
                            return (
                                <Button color="info" key={item.id} id={item.id} onClick={onClickHandler} className="donate-btn_country">{item.name}
                                    <span role="img" aria-label={item.name}>{item.emoji}</span>
                                </Button>
                            )
                        })}  
                        <div className="label">amount</div>
                        <input type="number" min="0" value={qiwiValue} onChange={handlerQIWi} className="donat-input"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                        <Button color="warning" className="donate-btn">Check</Button>
                        <img src={qiwi} alt="qiwi" className="donate-img"></img>
                        <img src={yandex} alt="yandex" className="donate-img"></img>
                    </div>

                    <div className="card-wrapper donat-card">
                        <div className="donat-card_header">Card</div>
                        <Button color="info" className="donate-btn_country">Russian 
                            <span role="img" aria-label="rus">🇷🇺</span>
                            <span role="img" aria-label="ok" className="ok-emoji">✅</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">Ukraine 
                            <span role="img" aria-label="ukr">🇺🇦</span>
                        </Button>
                        <div className="label">amount</div>
                        <input type="number" min="0" value={cardValue} onChange={handlerCard} className="donat-input"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                        <Button color="warning" className="donate-btn">Check</Button>
                        <img src={visa} alt="visa" className="donate-img"></img>
                    </div>

                    <div className="cryptocurrensy-wrapper donat-card">
                        <div className="donat-card_header">Cryptocurrensy</div>
                        <div className="label">amount</div>
                        <input type="number" min="0" value={cryptoValue} onChange={handlerCrypto} className="donat-input"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                        <div className="img-wrapper">
                            <img src={bitcoin} alt="bitcoin" className="donate-img"></img>
                            <img src={ether} alt="etherium" className="donate-img"></img>
                            <img src={dash}  alt="dash" className="donate-img"></img>
                            <img src={doge} alt="doge" className="donate-img"></img>
                            <img src={lite} alt="lite" className="donate-img"></img>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

