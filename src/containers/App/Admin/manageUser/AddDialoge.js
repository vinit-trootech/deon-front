import React, { useEffect, useState } from 'react';
import { Image, Form, Input, Row, Col, Card, Modal, Table, Button } from "antd";
import { addData } from '../../../../appRedux/actions/Common'
import { useDispatch, useSelector } from "react-redux";


const AddUser = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputVal, setInputVal] = useState({
        username: '',
        email: '',
        phone: '',
        first_name: '',
        last_name: ''
    })
    const tempData = useSelector(({ common }) => common)
    const userdata = useSelector(({ auth }) => auth)
    const [userid, setuserid] = useState(0);
    const dispatch = useDispatch();
    const handleClose = () => {
        props.isAddModalOpen();
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = values => {
        let formData = new FormData();
        formData.append('username', inputVal.email);
        formData.append('email', inputVal.email);
        formData.append('phone', inputVal.phone)
        formData.append('first_name', inputVal.first_name)
        formData.append('last_name', inputVal.last_name)
        const obj = {
            formData: formData,
            path1: '/api/v1/traders/create/',
            user_id:userdata.userData.authUser.user_id
        }
        dispatch(addData(obj));
    };

    useEffect(() => {
        if (tempData.successAdd == true) {
            props.isAddModalOpen();
        }
    }, [tempData])
    useEffect(() => {
        setuserid(userdata.userData.authUser.user_id)
    }, [userdata])
    return (
        <div>
            <Modal
                style={{ padding: "10px" }}
                width={1000}
                title="Add User"
                centered
                visible={props.show}
                footer={[
                    <Button key="back" onClick={() => props.isAddModalOpen()}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => onFinish()}>
                      Save
                    </Button>, ]}
            >
                <Form
                    name="basic"
                    //onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="gx-signin-form gx-form-row0"
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <div style={{ textAlign: "center", margin: "10px 0" }}>
                                <Image width={100} src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32, 32]}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="first_name"
                                rules={[{ required: true, message: 'Please enter your firstname!' }, {
                                    pattern: /^[a-zA-Z]+$/,
                                    message: 'First name accept characters only!',
                                },
                                ]}
                            >
                                <Input style={{ margin: "10px 0", height: "50px", display: "block" }} placeholder="First Name*"
                                    onChange={e => setInputVal({ ...inputVal, first_name: e.target.value })}
                                    value={inputVal.first_name}
                                />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter your E-mail!' }, {
                                pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                message: 'Please Enter valid E-mail!',
                            },
                            ]} name="email">
                                <Input style={{ margin: "10px 0", height: "50px", display: "block" }} placeholder="Email Address*"
                                    name="email"
                                    onChange={e => setInputVal({ ...inputVal, email: e.target.value })}
                                    value={inputVal.email}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item rules={[{ required: true, message: 'Please enter your lastname!' }, {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Last name accept characters only!',
                            },
                            ]}
                                name="last_name">
                                <Input style={{ margin: "10px 0", height: "50px", display: "block" }} placeholder="Last Name*"
                                    onChange={e => setInputVal({ ...inputVal, last_name: e.target.value })}
                                    name="last_name"
                                    value={inputVal.last_name} />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number!' },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject();
                                        }
                                        if (isNaN(value)) {
                                            return Promise.reject("Phone number has to be a number.");
                                        }
                                        if (value.length < 10) {
                                            return Promise.reject("Please Enter Valid phone number.");
                                        }
                                        if (value.length > 10) {
                                            return Promise.reject("Please Enter Valid phone number.");
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                                ]}
                            >
                                <Input style={{ margin: "10px 0", height: "50px", display: "block" }} placeholder="Phone Number*"
                                    onChange={e => setInputVal({ ...inputVal, phone: e.target.value })}
                                    name="phone"
                                    value={inputVal.phone} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default AddUser;