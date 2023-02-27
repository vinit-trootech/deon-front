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

const UpdateBond = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Card className="gx-card" title="Update Bond">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="bondname"
                    label="Bondname"
                    rules={[{ required: true, message: 'Please enter bond name.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sector"
                    label="Sector"
                    rules={[{ required: true, message: 'Please select sector.' }]}>
                    <Select placeholder="Please select sector">
                        <Option value="broker">Broker</Option>
                        <Option value="trader">Trader</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="radio-group" label="Bond Status"
                    rules={[{ required: true, message: 'Please select bond status.' }]}>
                    <Radio.Group>
                        <Radio value="a">Yes</Radio>
                        <Radio value="b">No</Radio>
                    </Radio.Group>
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

export default UpdateBond;