import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    AutoComplete,
    Radio
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../appRedux/actions/Common';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const UpdateSector = () => {
    const [form] = Form.useForm();



    const onFinish = values => {
        console.log('Received values of form: ', values);
        // dispatch(updateData({ id, values }))
    };

    return (
        <Card className="gx-card" title="Update Sector">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="name"
                    label="Sectorname"

                    rules={[{ required: true, message: 'Please enter sector name.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Sector Description"
                    rules={[{ required: true, message: 'Please select sector status.' }]}>
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UpdateSector;

