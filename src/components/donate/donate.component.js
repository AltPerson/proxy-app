import React from 'react';
import { Container, Button } from "reactstrap";

import "./donate.css";

import bitcoin from "./img/bitcoin.png"
import ether from "./img/etherium.png"

export default function Donate() {
    return(
        <Container>
            <div className="wrapper">
                <div className="donat-header">Donate</div>
                <hr/>
                <div className="donat-body">
                    <div className="cryptocurrensy-wrapper donat-card">
                        <div className="donat-card_header">Cryptocurrensy</div>
                        <div className="label">amount</div>
                        <input className="donat-input" placeholder="0.00$"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                        <img src={bitcoin} style={{ width: "120px", justifyContent: "space-between", display: "flex", margin: "0 auto" }} alt="bitcoin"></img>
                        <img src={ether} style={{ width: "120px", display: "flex",justifyContent: "space-between", margin: "0 auto" }} alt="etherium"></img>
                    </div>
                    <div className="card-wrapper donat-card">
                        <div className="donat-card_header">Card</div>
                        <Button color="info" className="donate-btn_country">Russian 
                            <span role="img">🇷🇺</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">Ukraine 
                            <span role="img">🇺🇦</span>
                        </Button>
                        <div className="label">amount</div>
                        <input className="donat-input" placeholder="0.00$"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                    </div>
                    <div className="qiwi-wrapper donat-card">
                        <div className="donat-card_header">Qiwi/Yandex</div>
                        <Button color="info" className="donate-btn_country">Russian 
                            <span role="img">🇷🇺</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">Ukraine 
                            <span role="img">🇺🇦</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">Dollar 
                            <span role="img">💵</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">Europe 
                            <span role="img">💶</span>
                        </Button>
                        <Button color="info" className="donate-btn_country">
                            <span role="img">🇰🇿</span>Kazahstan  
                        </Button>
                        <div className="label">amount</div>
                        <input className="donat-input" placeholder="0.00$"></input>
                        <Button color="success" className="donate-btn">Pay</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

