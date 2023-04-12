import {
    Form,
    Input,
    Select,
    TreeSelect,
    Tag,
    Button,
} from 'antd'
import { CompleteConditionArray, CompleteCondition, DefaultTags } from '../Constant/Constant'
import { titlecaseCondition } from '../utils/utils'

const { TextArea } = Input;

export default function CreateMezashiFormComponent({
    mezashiList, tags
}) {
    return (
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>

        
        <Form.Item label="Parent">
          <TreeSelect
            treeData={mezashiList}
            fieldNames={{label: "name", value: "id"}}
          />
        </Form.Item>

        <Form.Item label="Tag">
            <Select>
                {
                    [...DefaultTags, ...tags].map(tag => {
                        return (
                            <Select.Option value={tag.name}>
                                <Tag color={tag.tagColor.toLowerCase()}>
                                    {tag.name}
                                </Tag>
                            </Select.Option>
                        )
                    })
                }
            </Select>
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            {
                
                CompleteConditionArray.map((condition, index) => {
                    return (
                        <Select.Option value={CompleteCondition[index]}>
                            {titlecaseCondition(condition)} 
                        </Select.Option>
                    )
                })
            }      
          </Select>
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>
        
        <Form.Item>
            <Button>Create</Button>
        </Form.Item>

      </Form>
    )
}