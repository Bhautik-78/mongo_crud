import React, {useState, useEffect} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {Row, Col, Card, Form, Input, InputNumber, Select, Radio, Checkbox, Button} from "antd";
import {UserOutlined, MailOutlined, HomeOutlined, FlagOutlined, LockOutlined, MobileOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import './route.css';
let editedId = null;

const SignUp = (props) => {

    const history = useHistory()
    const [userDetail, setUserDetail] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        age: "",
        address: "",
        gender: "",
        country: null,
        password: "",
        errors: {}
    });
    const [data, setData] = useState([]);
    const [errors, setValidation] = React.useState({});

    const items = [
        {
            label: "India",
            value: "India"
        },
        {
            label: "Brazil",
            value: "Brazil"
        },
        {
            label: "USA",
            value: "USA"
        },
        {
            label: "Dubai",
            value: "Dubai"
        },
        {
            label: "UK",
            value: "UK"
        }
    ]

    useEffect(() => {
        listData(props.match.params.id);
    }, [props.match.params.id]);

    const listData = id => {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(response => {
                if(response.data && response.data._id){
                    setUserDetail(response.data)
                }
            })
            .catch(error => console.log(error));

    }

    const handleChange = e => {
        const {name, value} = e.target;
        if (name === "gender") {
            setUserDetail({...userDetail, [name]: value})
        } else {
            setUserDetail({...userDetail, [name]: value})
        }
    }

    const validation = (name, value) => {
        const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ig
        switch (name) {
            case 'firstname':
                if (!value) {
                    return "'Please input your firstname!'"
                } else {
                    return '';
                }
            case 'lastname':
                if (!value) {
                    return 'Please input your lastname!'
                } else {
                    return ''
                }
            case 'email':
                if (!emailRegx.test(value)) {
                    return 'Please input your EmailId!'
                } else {
                    return ''
                }
            case 'phone':
                if (!value) {
                    return 'Please input your phone number!'
                } else {
                    return ''
                }
            case 'age':
                if (!value) {
                    return 'Please input your age!'
                } else {
                    return ''
                }
            case 'address':
                if (!value) {
                    return 'Address is required'
                } else {
                    return ''
                }
            case 'gender':
                if (!value) {
                    return 'Gender is required'
                } else {
                    return ''
                }
            case 'country':
                if (!value) {
                    return 'Country is required'
                } else {
                    return ''
                }
            case 'password':
                if (!value) {
                    return 'password is required'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const resetForm = () => {
        setUserDetail({})
        setValidation({})
    }

    const onCreate = () => {

        let allErrors = {}

        const userData = {
            firstname: userDetail.firstname,
            lastname: userDetail.lastname,
            email: userDetail.email,
            phone: userDetail.phone,
            age: userDetail.age,
            address: userDetail.address,
            gender: userDetail.gender,
            country: userDetail.country,
            password: userDetail.password
        }

        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        })
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if (props.match.params.id !== undefined) {
                axios.put(`http://localhost:8080/users/${userDetail._id}`,userDetail)
                    .then((res) => {
                        resetForm()
                        history.push("/users")
                        }
                    );
            } else {
                userDetail.id = data.length + 1;
                axios.post('http://localhost:8080/users', userDetail)
                    .then(() => {
                        resetForm()
                        history.push("/login")
                    })
            }
        }
    }

    return (
        <>
            <Row style={{marginTop: 100}}>
                <Col span={8}/>
                <Col span={8}>
                    <Card>
                        <h2 style={{textAlign: "center"}}>Registration Form</h2>
                        <p style={{textAlign: "center"}}>Creat Your Account</p><br/>
                        <Form>
                            <Form.Item>
                                <Input placeholder="Enter Your firstname" name="firstname"
                                       value={userDetail.firstname}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                                <span className="error">{errors.firstname}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your lastname" name="lastname" value={userDetail.lastname}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                                <span className="error">{errors.lastname}</span>
                            </Form.Item>

                            <Form.Item
                                compact
                                rules={[{type: 'email'}]}
                            >
                                <Input placeholder="Enter Your EmailId" name="email" value={userDetail.email}
                                       onChange={handleChange} addonBefore={<MailOutlined/>}/>
                                <span className="error">{errors.email}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your Mobile Number" name="phone" value={userDetail.phone}
                                       onChange={handleChange} addonBefore={<MobileOutlined/>}
                                       style={{width: '100%'}}/>
                                <span className="error">{errors.phone}</span>
                            </Form.Item>

                            <Form.Item label="Age">
                                <InputNumber placeholder="age" name="age" value={userDetail.age || ""}
                                             onChange={value => handleChange({target: {name: "age", value}})}/>
                                <span className="error">{errors.age}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input style={{width: '50%'}} placeholder="Input Address"
                                       name="address" value={userDetail.address} addonBefore={<HomeOutlined/>}
                                       onChange={handleChange}/>
                                <span className="error">{errors.address}</span>
                            </Form.Item>

                            <Form.Item>
                                <Radio.Group
                                    onChange={e => handleChange({target: {name: "gender", value: e.target.value}})}
                                    value={userDetail.gender}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                                <span className="error">{errors.gender}</span>
                            </Form.Item>

                            <Form.Item label={(<FlagOutlined/>)}>
                                <Select
                                    placeholder="Enter Your Country"
                                    onChange={value => handleChange({target: {name: "country", value}})}
                                    value={userDetail.country}
                                    allowClear
                                >
                                    {items.map((items,index) => (
                                        <Select.Option
                                            key={items.value}
                                            value={items.value}>
                                            {items.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <span className="error">{errors.country}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input.Password placeholder="Enter Your PassWord" name="password"
                                                value={userDetail.password} onChange={handleChange}
                                                addonBefore={(<LockOutlined/>)}/>
                                <span className="error">{errors.password}</span>
                            </Form.Item>

                            {/*<Form.Item*/}
                            {/*    name="confirm"*/}
                            {/*    dependencies={['password']}*/}
                            {/*    hasFeedback*/}
                            {/*    rules={[{required: true, message: 'Please confirm your password!'},*/}
                            {/*        ({getFieldValue}) => ({*/}
                            {/*            validator(rule, value) {*/}
                            {/*                if (!value || getFieldValue('password') === value) {*/}
                            {/*                    return Promise.resolve();*/}
                            {/*                }*/}
                            {/*                return Promise.reject('The two passwords that you entered do not match!');*/}
                            {/*            },*/}
                            {/*        }),*/}
                            {/*    ]}*/}
                            {/*>*/}
                            {/*    <Input.Password placeholder="Enter Your Confirm PassWord"*/}
                            {/*                    name="confirm" addonBefore={(<LockOutlined/>)}/>*/}
                            {/*</Form.Item>*/}

                            <Form.Item

                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I have read the agreement
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={onCreate}>
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
        </>
    )
}

export default SignUp;
