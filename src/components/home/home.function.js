import React , {useState} from 'react';
import logo from "../logo.png";
import Navbar from './nav.function';
import LandPost from '../land/landPost.function';
import { buttonsData} from "./data";

import {TabContent, TabPane} from "reactstrap";

export default function HomeFunction() {

    const [land, setLand] = useState("USA")
    const [indexLand, setIndexLand] = useState("1")

    return (
            <div className="home-wrapper">
                <img className="home-logo hide" src={logo} alt="search" />
                <Navbar buttonsData={buttonsData} setLand={setLand} setIndex={setIndexLand}/>
                <TabContent
                    className="tabContent mb-3"
                    activeTab={indexLand}
                ></TabContent>

                <TabContent
                    className="tabContent mb-3"
                    activeTab={indexLand}
                    >
                    {buttonsData.map((item) => {
                        return (
                        <TabPane key={item.id} tabId={item.id}>
                            <LandPost
                            
                            getLand={item.value}
                            />
                        </TabPane>
                        );
                    })}
                </TabContent>
            </div>
    )
}




