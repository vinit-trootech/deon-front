import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card, Input, Button, Form } from 'antd';
import { useParams } from 'react-router';
import {
    hideMessage,
    showAuthLoader,
    profileReadRequest,
    profileUpdateRequest
} from "../../../../appRedux/actions/Auth.js";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
    const data = useSelector(({ auth }) => auth);
    const dispatch = useDispatch();
    const [isForm, setIsForm] = useState(false);
    const [profile, setProfile] = useState(true);
    const [formInput, setFormInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    useEffect(() => {
        setFormInput({
            first_name: data.wholeData.first_name,
            last_name: data.wholeData.last_name,
            email: data.wholeData.email,
            phone: data.wholeData.phone,
        })
    }, [data])

    const getData = () => {
        dispatch(showAuthLoader());
        dispatch(profileReadRequest(id));
        setProfile(false)
    }

    useEffect(() => {
        if (profile == true) {
            getData();
        }
    }, [data]);

    const handleEdit = () => setIsForm(true);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormInput((prev) => ({
            ...prev,
            [e.target.name]: value
        }));
    };

    const { id } = useParams();


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('first_name', formInput.first_name);
        formData.append('last_name', formInput.last_name);
        formData.append('phone', formInput.phone);
        dispatch(profileUpdateRequest({ formData, id }));
        setProfile(true)
        setIsForm(false);
    };

    return (
        <Card title="user Profile" bordered={false} style={{ width: "78%", border: "1px solid black", margin: "auto" }}>
            <Row gutter={16}>
                <Col style={{ textAlign: "right" }} className="gutter-row" span={24}>
                    {!isForm ?
                        <Button type="primary" onClick={handleEdit}>
                            Edit
                        </Button> :
                        <div>
                            <Button type="primary" onClick={handleSubmit}>
                                Save
                            </Button>
                            {/* <Button type="primary">
                                cancel
                            </Button> */}
                        </div>}
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <div style={{ textAlign: "center" }}>
                        <img width={100} src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" />
                    </div>
                </Col>
            </Row>
            <Row gutter={[32, 32]}>
                <Col className="gutter-row" span={12}>
                    <Input disabled={!isForm} onChange={handleChange} style={{ margin: "10px 0", height: "50px" }} placeholder={formInput.first_name} name="first_name" value={formInput.first_name} />
                    <Input disabled={!isForm} style={{ margin: "10px 0", height: "50px" }} placeholder={formInput.email} name="email" value={formInput.email} />
                </Col>
                <Col className="gutter-row" span={12}>
                    <Input disabled={!isForm} onChange={handleChange} style={{ margin: "10px 0", height: "50px" }} placeholder={formInput.last_name} name="last_name" value={formInput.last_name} />
                    <Input disabled={!isForm} onChange={handleChange} style={{ margin: "10px 0", height: "50px" }} placeholder={formInput.phone} name="phone" value={formInput.phone} />
                </Col>
            </Row>
        </Card>
    )


}

export default Profile;

