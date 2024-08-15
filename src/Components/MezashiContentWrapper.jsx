import { Tag, Space } from "antd"
import { CalendarOutlined } from "@ant-design/icons"
import { CompleteCondition } from "../Constant/Constant"

export default function MezashiContentWrapper({mezashi}) {
   return (
    <div className="mezashi-treenode">
        <div className="mezashi-name">
            <span className="fw-bold">{mezashi.name}</span>
            {
                mezashi.completeCondition === CompleteCondition.SPECIFIC_DATE ? (
                    <Tag icon={<CalendarOutlined />} color="default" className="ms-2">
                        {mezashi.targetDate}
                    </Tag>
                )
                : (
                    <Tag color="default" className="ms-2">
                        {
                            mezashi.completeCondition.split("_").join(" ").toLowerCase()
                        }
                    </Tag>
                )
            }
            
        </div>
        { 
            mezashi.tags && mezashi.tags.length > 0 && 
            <Space size={[0, mezashi.tags.length]} className="mezashi-tags" wrap>
                {
                    mezashi.tags.map(tag => {
                        return <Tag color={tag.tagColor}>{tag.name}</Tag>
                    })
                }
            </Space>
        } 
    </div>
    
    
   ) 
}