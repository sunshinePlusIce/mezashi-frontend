import {
    Input,
    Form,
    Tag,
    Select,
    Button
} from 'antd';
import { supportedColorsArray } from '../Constant/Constant';
import { titlecase } from '../utils/utils';

export default function CreateTagComponent() {
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="name">
                <Input />
            </Form.Item>

            <Form.Item label="Colors">
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
            <Form.Item>
                <Button>Create</Button>
            </Form.Item>
        </Form>
    )
}