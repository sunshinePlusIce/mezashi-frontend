import { Divider, Tag, Spacer, Space } from 'antd';

export default function TagInfoComponent({tags}) {
    return (
        <>
            <Divider orientation="left">Default Tags</Divider>
            <Space size={[0, 8]} wrap>
                <Tag color="blue">work</Tag>
                <Tag color="cyan">life</Tag>
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