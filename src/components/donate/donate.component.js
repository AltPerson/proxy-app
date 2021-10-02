import React, { useState } from "react";
import { Container, Button } from "reactstrap";

import { buttonsQIWI, buttonsCard } from "./data";
import Label from "./label.component";
import proxyService from "../../services/proxy.service";

import "./donate.css";

import bitcoin from "./img/bitcoin.png";
import ether from "./img/ethr.png";
import dash from "./img/dash.png";
import lite from "./img/lite.png";
import doge from "./img/doge.png";
import visa from "./img/visa.png";
import qiwi from "./img/qiwi.png";
import yandex from "./img/yandex.png";
import logo from "../logo.png"

import CheckModal from "./modal_card.component";
import CheckQiwi from "./modal_qiwi.component";


export default function Donate() {
  document.title = 'Donate';
  const [qiwiValue, setqiwiValue] = useState(0);
  const [cardValue, setCardValue] = useState(0);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [isLabel, setIsLabel] = useState({
    id: "",
    type: "",
    value: "",
  });
  const [cardVerify, setCardVerify] = useState(null);
  const [qiwiVerify, setQiwiVerify] = useState(null);

  const [services] = useState(new proxyService())
  
  const getCryptoURL = () => {
    services.getCrypto(Math.round(cryptoValue))
      .then((url) => {
        window.open(url)
      })
      .catch(error => {
        if(error){
          window.location.assign("/login")
        }
      })
  };

  const getCardURL = () => {
    services.getCard(Math.round(cardValue), isLabel.value)
      .then((url) => {
        window.open(url.url)
        setCardVerify(url.order_id)
      })
      .catch(error => {
        if(error){
          window.location.assign("/login")
        }
      })
  }

  const getQiwiURL = () => {
    services.getQiwi(Math.round(qiwiValue), isLabel.value)
      .then((url) => {
        window.open(url.url)
        setQiwiVerify(url.order_id)
      })
      .catch(error => {
        if(error){
          window.location.assign("/login")
        }
      })
  }

  const handlerQIWi = (e) => {
    let newMsg = e.currentTarget.value;
    setqiwiValue(newMsg);
  };

  const handlerCard = (e) => {
    let newMsg = e.currentTarget.value;
    setCardValue(newMsg);
  };

  const handlerCrypto = (e) => {
    let newMsg = e.currentTarget.value;
    setCryptoValue(newMsg);
  };

  const onClickHandlerQiwi = (e) => {
    let click = e.currentTarget.id;
    const value = e.currentTarget.value;
    setIsLabel({
      id: click,
      type: "Qiwi",
      value,
    });
  };

  const onClickHandlerCard = (e) => {
    let click = e.currentTarget.id;
    const value = e.currentTarget.value;
    setIsLabel({
      id: click,
      type: "Card",
      value,
    });
  };

  console.log(isLabel);
  return (
    <Container>
      <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
      <div className="wrapper">
        <div className="donat-header">Donate</div>
        <hr style={{ margin: "0" }} />
        <div className="donat-body">
          <div className="qiwi-wrapper donat-card">
            <div className="donat-card_header">Qiwi/Yandex</div>
            {buttonsQIWI.map((item, index) => {
              if (item.emoji === null)
                return (
                  <Button
                    color="info"
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    onClick={onClickHandlerQiwi}
                    className="donate-btn_country"
                  >
                    {item.name}
                    {item.type === isLabel.type && item.id === isLabel.id ? (
                      <Label />
                    ) : (
                      ""
                    )}
                  </Button>
                );
              return (
                <Button
                  color="info"
                  key={item.id}
                  id={item.id}
                  onClick={onClickHandlerQiwi}
                  className="donate-btn_country"
                  value={item.value}
                >
                  {item.name}
                  <span role="img" aria-label={item.name}>
                    {item.emoji}
                  </span>
                  {item.type === isLabel.type && item.id === isLabel.id ? (
                    <Label />
                  ) : (
                    ""
                  )}
                </Button>
              );
            })}
            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              value={qiwiValue}
              onChange={handlerQIWi}
              className="donat-input"
            ></input>
            <Button color="success" className="donate-btn" onClick={getQiwiURL}>
              Pay
            </Button>
            <CheckQiwi cardVerify={qiwiVerify}/>
            <img src={qiwi} alt="qiwi" className="donate-img"></img>
            <img src={yandex} alt="yandex" className="donate-img"></img>
          </div>

          <div className="card-wrapper donat-card">
            <div className="donat-card_header">Card</div>
            {buttonsCard.map((item, index) => {
              return (
                <Button
                  color="info"
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  className="donate-btn_country"
                  onClick={onClickHandlerCard}
                >
                  {item.name}
                  <span role="img" aria-label={item.name}>
                    {item.emoji}
                  </span>
                  {item.type === isLabel.type && item.id === isLabel.id ? (
                    <Label />
                  ) : (
                    ""
                  )}
                </Button>
              );
            })}

            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              value={cardValue}
              onChange={handlerCard}
              className="donat-input"
            ></input>
            <Button color="success" className="donate-btn" onClick={getCardURL}>
              Pay
            </Button>
            <CheckModal cardVerify={cardVerify} typeWallet={"card"}/>
            <img src={visa} alt="visa" className="donate-img"></img>
          </div>

          <div className="cryptocurrensy-wrapper donat-card">
            <div className="donat-card_header">Cryptocurrency</div>
            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              value={cryptoValue}
              onChange={handlerCrypto}
              className="donat-input"
            ></input>
            <Button color="success" className="donate-btn" onClick={getCryptoURL}>
              Pay
            </Button>
            <div className="img-wrapper">
              <img src={bitcoin} alt="bitcoin" className="donate-img"></img>
              <img src={ether} alt="etherium" className="donate-img"></img>
              <img src={dash} alt="dash" className="donate-img"></img>
              <img src={doge} alt="doge" className="donate-img"></img>
              <img src={lite} alt="lite" className="donate-img"></img>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
