import React from 'react'
import "antd/dist/antd.css";
import { Select } from "antd";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Card, Checkbox, Button, Col } from 'antd';
import axios from "axios";
import {getAllSecurity,saveSecurityQuestion} from '../../../appRedux/actions/Auth';
import { useHistory } from "react-router-dom";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const formTailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
        offset: 4,
    },
};

const SecurityQuestions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const data= useSelector(({auth}) => auth);
    const [submitedQue, setsubmitedQue] = useState([]);
    const [QueList,setQueList] = useState([]);
    const [dropDownValue1,setdropDownValue1] = useState(0);
    const [dropDownValue2,setdropDownValue2] = useState(0);
    const [dropDownValue3,setdropDownValue3] = useState(0);

    const isValid = () => {
        return false;
    }
    
    const { Option } = Select;

    const onFinish = () => {
        let array = []
         for (let index = 0; index < submitedQue.length; index++) 
         {
             const obj = {
                "question_id":submitedQue[index].question_id,
                "answer":submitedQue[index].answer
             }
             array.push(obj)
         }
         const data = {
            "user_id": localStorage.getItem('user_id'),
            "question_answer":array
         }
         dispatch(saveSecurityQuestion(data))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleSelect = (value,option) => {
         if(option.id == 0)
          {
              setdropDownValue1(value)
          }
          else if(option.id == 1)
          {
              setdropDownValue2(value)
          }
          else
          {
              setdropDownValue3(value)
          }
          document.getElementsByName(option.id)[0].readOnly = false;
        let temp1 = data.data.filter((id)=>id.question == value);
        const obj = {
            "question_id":temp1[0].id,
            "answer":"",
            "id":option.id
        }
        submitedQue.push(obj);
        setsubmitedQue(submitedQue);
        }
    const handleChange = (e) => {

          for (let index = 0; index < submitedQue.length; index++) 
          {
               if(submitedQue[index].id == e.target.name)
               {
                   submitedQue[index].answer = e.target.value
               }
              
          }      
    }
    useEffect(()=>{
            dispatch(getAllSecurity());
    },[])
    return (
        <div>

            <Col span={20}>
                <Card className="gx-card" title="Security question">
                    <Form form={form} name="dynamic_rule" onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <div gutter={[24, 48]}>
                            <Form.Item name="question1" label="Question 1" {...formItemLayout} >
                                <Select
                                    defaultValue="Select Your Question"
                                    name="select ans1"
                                    style={{ width: "100%" }}
                                    onChange={handleSelect}
                                >
                                   {data.data.map(obj=>{
                                       if(dropDownValue2 != obj.question && dropDownValue3 != obj.question)
                                        {
                                            return(<Option id="0" key={obj.id} value={obj.question}>{obj.question}</Option>)
                                        }
                                   })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="Ans1"
                                label="Answer"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter your Answer',
                                    },
                                ]}
                            >
                                <Input type="text" name={0} placeholder="Please Enter your Answer" value=""
                                onChange={handleChange} readOnly={true}/>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item name="question2" label="Question 2" {...formItemLayout}>
                                <Select
                                    defaultValue="Select Your Question"
                                    name="select ans2"
                                    style={{ width: "100%" }}
                                    onChange={handleSelect}
                                >
                                    {data.data.map(obj=>{
                                       if(dropDownValue1 != obj.question && dropDownValue3 != obj.question)
                                        {
                                            return(<Option id="1" key={obj.id} value={obj.question}>{obj.question}</Option>)
                                        }
                                   })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="Ans2"
                                label="Answer"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter your Answer',
                                    },
                                ]}
                            >
                                 <Input type="text" name={1} placeholder="Please Enter your Answer" value=""
                                onChange={handleChange} readOnly={true}/>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item name="question3" label="Question 3" {...formItemLayout}>
                                <Select
                                    defaultValue="Select Your Question"
                                    name="select ans3"
                                    style={{ width: "100%" }}
                                    onChange={handleSelect}
                                >
                                    {data.data.map(obj=>{
                                       if(dropDownValue1 != obj.question && dropDownValue2 != obj.question)
                                        {
                                            return(<Option id="2" key={obj.id} value={obj.question}>{obj.question}</Option>)
                                        }
                                   })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="Ans3"
                                label="Answer"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter your Answer',
                                    },
                                ]}
                            >
                                 <Input type="text" name={2} placeholder="Please Enter your Answer" value=""
                                onChange={handleChange} readOnly={true}/>
                            </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Col>
        </div>
    )
}

export default SecurityQuestions
