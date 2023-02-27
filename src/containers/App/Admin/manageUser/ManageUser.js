import { Card, Modal, Table, Button, Radio, Switch, Checkbox } from "antd";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataOne } from '../../../../appRedux/actions/Common';
import { DeleteOutlined, EditOutlined, PropertySafetyFilled } from '@ant-design/icons';
import './userStyle.css'
import DeleteDialoge from "./DeleteDialoge";
import UpdateDialoge from "./UpdateDialoge"

const ManageUser = (props) => {
    const columns = [
        {
            title: 'Username & Role',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'first_name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'last_name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '',
            dataIndex: '',
            key: 'y',
            render: () => {
                return (
                    <>
                        <Switch />
                    </>
                )
            }
        },
        {
            title: "Action",
            dataIndex: "",
            key: 'x',
            width: 200,
            render: (text, record) => {
                return (
                    <>
                        <Button type="primary">
                            <DeleteOutlined
                                onClick={(e) => handleDelete(record)} />
                        </Button>
                        <Button type="primary">
                            <EditOutlined onClick={(e) => handleupdate(record)} />
                        </Button>
                    </>
                );
            },
        },
    ];
    const [deleteModalBox, setdeleteModalBox] = useState(false)
    const [updateModalBox, setupdateModalBox] = useState(false)
    const [traders, setTraders] = useState([])
    const [traderFlag, setTraderFlag] = useState(true)
    const [details, setDetails] = useState({})
    const data = useSelector(({ common }) => common)
    const dispatch = useDispatch()
    const userdata = useSelector(({ auth }) => auth)
    const [userid, setuserid] = useState(0);

    const getDataTrader = () => {
        const obj = {
            user_id: userdata.userData.authUser.user_id,
            path1: "/api/v1/traders/list/"
        }
        dispatch(getDataOne(obj))
    }
    useEffect(() => {
        if (traderFlag == true) {
            getDataTrader();
        }
    }, [])
    useEffect(() => {
        setTraders(data.dataone);
        setTraderFlag(false)
    }, [data.dataone])
    useEffect(() => {
        setuserid(userdata.userData.authUser.user_id)
    }, [userdata])
    const handleDelete = (record) => {
        setDetails(record)
        setdeleteModalBox(true)
        setTraderFlag(true)
    }
    const hideDeleteModalBox = () => {
        setdeleteModalBox(false);
        if (traderFlag == true) {
            getDataTrader();
        }
    }
    const handleupdate = (record) => {
        setDetails(record)
        setupdateModalBox(true)
        setTraderFlag(true)
    }
    const hideupdateModalBox = () => {
        setupdateModalBox(false);
        if (traderFlag == true) {
            getDataTrader();
        }
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        })
    };
    return (
        <div>
            <Card>
                <div>
                    <Table
                        columns={columns}
                        dataSource={traders}
                    />
                </div>
            </Card >

            <UpdateDialoge isUpdateModalOpen={hideupdateModalBox} show={updateModalBox} details={details} />
            <DeleteDialoge isDeleteModalOpen={hideDeleteModalBox} show={deleteModalBox} details={details} />
        </div >
    );
}

export default ManageUser;

