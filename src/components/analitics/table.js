import React, {useEffect, useState} from "react";

import proxyService from "../../services/proxy.service";

import Spinner from "../spinner/spinner.component";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory  from "react-bootstrap-table2-paginator";


const Tabs = () => {
    const [services] = useState(new proxyService())

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); 

    const getUsers = () => {
        services.getAllUsers()
            .then((res) => {
                setUsers(res)
                setLoading(false)
            })
    }

    const colums = [
        { dataField: "id", text: "id", },
        { dataField: "nickname", text: "nickname", },
        { dataField: "email", text: "email", },
        { dataField: "balance", text: "balance", },
    ]

    const pagination = paginationFactory({
        hideSizePerPage: true
    }) 

    useEffect(() => {
        getUsers(1000);
    })

    return(
        <div>
            {loading ? (
                <Spinner/>
            ) : (
                <BootstrapTable
                    className="tableDark"
                    keyField="nickname"
                    data={users}
                    columns={colums}
                    pagination={ pagination }
                />
            ) }
        </div>
    )
}

export default Tabs;