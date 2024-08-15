import { Divider, Tag, Spacer, Space } from 'antd';
import { DefaultTags } from '../Constant/Constant';

export default function TagInfoComponent({tags}) {
    return (
        <>
            <Divider orientation="left">Default Tags</Divider>
            <Space size={[0, 8]} wrap>
                {
                    DefaultTags.map(tag => <Tag color={tag.tagColor.toLowerCase()}>{tag.name}</Tag>)
                }
            </Space>
            <Divider orientation='left'>Custom Tags</Divider>
            { tags.length == 0 && 'No Custom Tags' }
            {
               tags.length > 0 && (
                    <Space size={[0, tags.length]} wrap>
                        {tags.map(tag => {
                            return <Tag color={tag.tagColor.toLowerCase()}>{tag.name}</Tag>
                        })}
                    </Space>
               ) 
            }
        </>
    )
}