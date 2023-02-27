import React, { useState, useEffect } from 'react';
import { Switch, Row, Col, Card, Table, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import DeleteDialoge from "./DeleteDialoge";
import UpdateDialoge from './UpdateDialoge';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getBrokerData, getData } from '../../../../appRedux/actions/Common';


function ManageBroker(props) {
    const columns = [
        {
            title: 'Username & Role',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full Name',
            dataIndex: 'first_name',
            key: 'first_name',
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

    const [brokers, setBrokers] = useState([])
    const [deleteModalBox, setdeleteModalBox] = useState(false)
    const [updateModalBox, setupdateModalBox] = useState(false)
    const [details, setDetails] = useState({})
    const [flag, setFlag] = useState(true)
    const data = useSelector(({ common }) => common)
    const userdata = useSelector(({ auth }) => auth)
    const dispatch = useDispatch()
    const [userid, setuserid] = useState(0);

    const handleDelete = (record) => {
        setDetails(record)
        setdeleteModalBox(true)
        setFlag(true)
    }

    const hideDeleteModalBox = () => {
        setdeleteModalBox(false);
        if (flag == true) {
            getDataBroker();
        }
    }
    const handleupdate = (record) => {
        setDetails(record)
        setupdateModalBox(true)
        setFlag(true)
    }
    const hideupdateModalBox = () => {
        setupdateModalBox(false)
        if (flag == true) {
            getDataBroker();
        }
    }
    const getDataBroker = () => {
        const obj = {
            user_id: userdata.userData.authUser.user_id,
            path1: "/api/v1/brokers/list/"
        }
        dispatch(getData(obj))
    }

    useEffect(() => {
        setBrokers(data.data)
        setFlag(false)
    }, [data.data])

    useEffect(() => {
        if (flag == true) {
            getDataBroker();
        }
    }, [data.data])

    useEffect(() => {
        setuserid(userdata.userData.authUser.user_id)
    }, [userdata])

    const rowSelection = {
        // selectedRowKeys: selectedRows,
        // onSelect: (record, selected) => {
        //     console.log(record);
        // },
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.username === "Disabled User",
            // Column configuration not to be checked
            username: record.username
        })
    };
    return (
        <div>
            <Card>
                <div>
                    <Table
                        columns={columns}
                        dataSource={brokers}
                    />
                </div>
            </Card >
            <UpdateDialoge isUpdateModalOpen={hideupdateModalBox} show={updateModalBox} details={details} />
            <DeleteDialoge isDeleteModalOpen={hideDeleteModalBox} show={deleteModalBox} details={details} />
        </div >
    );
}



export default ManageBroker

