import {
    Form,
    Input,
    Select,
    TreeSelect,
    Tag,
    Button,
    Tooltip,
    Typography,
    Divider
} from 'antd'
import { CompleteConditionArray, CompleteCondition, DefaultTags } from '../Constant/Constant'
import { titlecaseCondition } from '../utils/utils'
import axios from 'axios';
import { MEZASHI_NAME_MAX_LENGTH } from '../Constant/Constant';
import HelpComponent from './HelpComponent';
import { useState } from 'react'
import ErrorMessage from './ErrorMessage';

const { TextArea } = Input;

const toLowerCase = (s) => {
    let res = "";
    for (let i = 0; i < s.length; ++i) {
        let ch = s[i];
        res += ch.toLowerCase();
    }
    return res;
}

export default function CreateMezashiFormComponent({
    mezashiList, tags
}) {
    let completeConditionPromptMessages = {
        "MANUAL": "Your Mezashi get completed when you set it as Completed manually",
        "SPECIFIC_DATE": "Your Mezashi get completed when a specific date come",
        "CASCADE": "Your Mezashi get completed when all of its children get completed",
        "PICK": "Your Mezashi get completed when one of its children gets completed"
    } 
    const [form] = Form.useForm();
    const [tooltip, setTooltip] = useState({
        selected: true,
        selectedValue: "MANUAL"
    })
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        message: ""
    });

    const handleSelectCompleteCondition = (value) => {
        setTooltip({
            selected: true,
            selectedValue: value
        })
    }
    const client = axios.create({
        baseURL: `http://localhost:8080`
    });
    const handleFinish = async (values) => {
        let res;
        try {
           res = await client.post(`/users/1/mezashi`, values);
        } catch (e) {
            setErrorMessage({
                error: true,
                message: e.response.data.message
            })
        }
        if (res.status === 201) {
            setErrorMessage({
                error: false,
                message: ""
            })
            window.alert("success")
        }

    }
    return (
        <>
            <Form form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={handleFinish}
            >
                <Form.Item 
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your mezashi name"
                        }
                    ]}
                >
                <Input maxLength={MEZASHI_NAME_MAX_LENGTH}/>
                </Form.Item>

                
                <Form.Item 
                    label="Parent"
                    name="parentId">
                <TreeSelect
                    treeData={mezashiList}
                    fieldNames={{label: "name", value: "id"}}
                />
                </Form.Item>

                <Form.Item label="Tag" name="tags">
                    <Select
                        mode="multiple"
                    >
                        {
                            [...DefaultTags, ...tags].map(tag => {
                                return (
                                    <Select.Option value={tag.id}>
                                        <Tag color={tag.tagColor}>
                                            {tag.name}
                                        </Tag>
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="Condition" name="completeCondition">
                    <Select 
                        onSelect={handleSelectCompleteCondition}
                        required
                        >
                        {
                            CompleteConditionArray.map((condition, index) => {
                                return (
                                    <Select.Option value={condition}>
                                        {titlecaseCondition(condition)} 
                                    </Select.Option>
                                )
                            })
                        }      
                    </Select>
                   
                </Form.Item>
                <Tooltip title={
                        tooltip.selected 
                        ? completeConditionPromptMessages[tooltip.selectedValue]
                        : "CC: Complete Condition"
                    }>
                        <Typography.Link>
                            What's {titlecaseCondition(tooltip.selectedValue)}?
                        </Typography.Link>
                </Tooltip> 


                <Form.Item label="Description" name="description">
                <TextArea rows={4} />
                </Form.Item>

                {
                    errorMessage.error && <ErrorMessage message={errorMessage.message} />
                }
                
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType='submit'>Create</Button>
                </Form.Item>

            </Form>
        </>
        
    )
}