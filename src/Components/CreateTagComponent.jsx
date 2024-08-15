import {
    Input,
    Form,
    Tag,
    Select,
    Button
} from 'antd';
import { supportedColorsArray } from '../Constant/Constant';
import { titlecase } from '../utils/utils';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

export default function CreateTagComponent() {
    const [form] = useForm();
    const client = axios.create({
        baseURL: 'http://localhost:8080' 
    });
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        message: ""
    })
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={async (values) => {
                let res;
                try {
                    res = await client.post(`/users/1/tags`, {
                        name: values.name,
                        tagColor: values.tagColor
                    })
                } catch (e) {
                    setErrorMessage({
                        error: true,
                        message: e.response.data.message
                    })
                }
                if (res.status === 201) {
                    window.alert("created!")
                } else {
                    window.alert("creation failed!");
                }
            }}
        >
            <Form.Item label="Name" name="name" rules={[
                {
                    required: true,
                    message: "Please input your tag name"
                }
            ]}>
                <Input maxLength={20}/>
            </Form.Item>

            <Form.Item label="Color" name="tagColor" rules={[
                {
                    required: true,
                    message: "Please select your tag color"
                }
            ]}>
                <Select>
                    {
                        supportedColorsArray.map(color => {
                            return (
                                <Select.Option value={color}>
                                    <Tag color={color.toLowerCase()}>
                                        {titlecase(color)}
                                    </Tag>
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            {
                errorMessage.error && <ErrorMessage message={errorMessage.message} />
            }
            <Form.Item>
                <Button htmlType='submit'>Create</Button>
            </Form.Item>
        </Form>
    )
}