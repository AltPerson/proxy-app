import React, { Component } from 'react';

import "./faq.css";

import logo from "../logo.png"

export default class FAQ extends Component {

    componentDidMount() {
        document.title = 'FAQ';
    }

    render() {

        return(
            <div className="FAQ">
                <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
                <h3>О сервисе</h3>
                <div className="faqText">
                   После активации аккаунта становится доступен просмотр и покупка прокси. Купленные прокси появляются в сплывающем окне и в разделе history в виде ip:port. IP будет нашего сервера, он может отличаться от страны прокси. Это бэкконект прокси, они работают через наш сервер, поэтому при работе вы будете иметь исходящий айпи адрес, который вы покупали, а не нашего сервера. Нужно скопировать ip и port и без ошибок вставить их в ту программу, в которой прокси используется.
                </div>
                <br/>

                <div className="faqText">
                    После покупки прокси вы сможете пользоваться им не более 24 часов. Фактическое время работы может быть меньше, тогда возможно сделать Refaund в разделе "History". На это время прокси исключается из списка доступных вам для покупки. По истечении этого времени, если прокси онлайн, его можно купить в "History" в общем списке. Если прокси был ранее куплен, это отображается в окне информации. Учитывайте это, если не хотите покупать повторно то, что уже покупали ранее.
                </div>
                <br/>

                <div className="faqText">
                    Весь ассортимент прокси фильтруется по блеклистам, тип прокси, и дополнительным опциям.
                </div>
                <br/>

                <div className="faqText">
                    Сортировка по умолчанию сделана так, что сначала выдаются прокси, которые покупают наименования часто. 
                </div>
                <br/>

                <div className="faqText">
                    Есть два варианта покупки прокси:<br/>
                    кнопку BUY - покупка прокси на 24 часа подходит большинству пользователе<br/>
                    кнопка BUY OUT - выкуп прокси на 24 часа. После выкупа прокси пропадает из списка доступных для покупки другим пользователям на 24 часа.<br/>
                </div>
                <br/>

                <h3>Политика конфиденциальности</h3>
                <div className="faqText">
                    При передаче информации от бекконект серверов до прокси используется шифрование, сами бекконект сервера так же зашифрованы. Мы не храним логи соединений, не записываем трафик через прокси. Некоторые домены и порты могут быть заблокированы, что было бы недопускать активность, проводящую к прокси-прокси в блеклистах, и другие нежелательные последствия. Сервис сохраняет историю платежей пользователя. При обнаружении режима злоумышленной активности, запрещенной запретной активности. Мы не разглашаем информацию о наших клиентах.
                </div>
                <br/>
            </div>
        )
    }
}