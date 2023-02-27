import React, { useState } from 'react'
import { Card, Button, Radio } from "antd";
import ManageBroker from '../manageBroker/ManageBroker';
import ManageUser from '../manageUser/ManageUser';
import AddUser from '../manageUser/AddDialoge';
import AddBroker from '../manageBroker/AddDialoge';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../../../util/history'

function ManageTrader() {
    const data = useSelector(({ common }) => common)
    const [activeuser, setactiveuser] = useState(1)
    const [tab, setTab] = useState(1);
    const [addModalBox, setaddModalBox] = useState(false)
    const handleChange = (e) => {
        const value = e.target.value;
        setTab(value)
        setactiveuser(value)
    }
    const handleAdd = () => {
        setaddModalBox(true)
    }
    const hideAddModalBox = () => {
        setaddModalBox(false);
    }
    return (
        <div>
            <Card>
                <div className="gx-mx-sm-2">
                    {/* <h3 style={{ margin: "30px 0" }}>Users (20)</h3> */}
                    <div className="d-flex justify-content-between">
                        <div>
                            <Radio.Group className="gx-radio-group-link gx-radio-group-link-news" defaultValue={1}
                                onChange={handleChange}>
                                <Radio.Button value={1} className="gx-mb-1">Brokers</Radio.Button>
                                <Radio.Button value={0} className="gx-mb-1">Traders</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div>
                            <Button onClick={(e) => handleAdd()} type="primary" className="userAddButton">+ Add New</Button>
                        </div>
                    </div>
                </div>
            </Card>
            {tab === 1 ?
                <div>
                    <ManageBroker />
                    <AddBroker isAddModalOpen={hideAddModalBox} show={addModalBox} />
                </div> :
                <div>
                    <ManageUser />
                    <AddUser isAddModalOpen={hideAddModalBox} show={addModalBox} />
                </div>
            }
        </div >
    );
}

export default ManageTrader
// details={brokers}
// details={traders}
// fetchData={updatelistTrader}
// fetchDataTrader={updatelistTrader}