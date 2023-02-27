import { Card, Divider, Table, Button } from "antd";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import { getData, getSectorData } from "../../../../appRedux/actions/Common";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialoge from "./DeleteDialoge";


const SectorList = () => {

    const columns = [
        {
            title: 'Sector Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span className="gx-link">{text}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                        <Link to="/updatesector">
                            <Button type="primary">Edit</Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const [deleteModalBox, setdeleteModalBox] = useState(false)
    const [details, setDetails] = useState({})
    const [sectors, setSectors] = useState([])
    const data = useSelector(({ common }) => common)
    const dispatch = useDispatch()

    const handleDelete = (record) => {
        setDetails(record)
        setdeleteModalBox(true)
    }

    const hideDeleteModalBox = () => {
        setdeleteModalBox(false);
        dispatch(getSectorData())
    }

    useEffect(() => {
        setSectors(data.data)
    }, [data])

    useEffect(() => {
        dispatch(getSectorData())
    }, [])

    return (
        <div>
            <Card title="Simple Table">
                <Link to="/sectorform">
                    <Button type="primary" className="userAddButton">Create</Button>
                </Link>
                <Table className="gx-table-responsive" columns={columns}
                    dataSource={sectors}
                />
            </Card>
            <DeleteDialoge isDeleteModalOpen={hideDeleteModalBox} show={deleteModalBox} details={details} />
        </div>
    );
};

export default SectorList;