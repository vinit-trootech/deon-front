import { Card, Divider, Table, Button } from "antd";
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';

const handleDelete = () => {
    console.log("Bond Deleted Successfully...!")
}

const columns = [
    {
        title: 'Bond Name',
        dataIndex: 'bondname',
        key: 'name',
        render: text => <span className="gx-link">{text}</span>,
    },
    {
        title: 'Sector',
        dataIndex: 'sector',
        key: 'sector',
    },
    {
        title: 'Bond Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: "Action",
        dataIndex: "",
        key: 'x',
        width: 300,
        render: () => {
            return (
                <>
                    <Link to="/updatebond">
                        <Button type="primary">Edit</Button>
                    </Link>
                    <DeleteOutlined
                        onClick={handleDelete} />
                </>
            );
        },
    },
];

const data = [
    {
        key: '1',
        bondname: 'Bond 1',
        sector: 'Sector 1',
        status: 'Yes',
    },
    {
        key: '2',
        bondname: 'Bond 2',
        sector: 'Sector 4',
        status: 'Yes',
    },
    {
        key: '3',
        bondname: 'Bond 3',
        sector: 'Sector 1',
        status: 'No',
    },
    {
        key: '4',
        bondname: 'Bond 4',
        sector: 'Sector 1',
        status: 'Yes',
    },
    {
        key: '5',
        bondname: 'Bond 5',
        sector: 'Sector 5',
        status: 'No',
    },
];

const BondList = () => {


    return (
        <div>
            <Card title="Simple Table">
                <Link to="/bondform">
                    <Button type="primary" className="userAddButton">Create</Button>
                </Link>
                <Table className="gx-table-responsive" columns={columns}
                    dataSource={data}
                />
            </Card>
        </div>
    );
};

export default BondList;