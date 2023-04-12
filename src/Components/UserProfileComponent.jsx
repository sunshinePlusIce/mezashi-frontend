import { Descriptions } from "antd";

export default function UserProfileComponent({user}) {
    return (
    <Descriptions title="User Info">
        <Descriptions.Item label="Userame">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Creation Date">
            {user.creationDate}
        </Descriptions.Item>
        <Descriptions.Item label="Mezashi #">
            {user.mezashiList.length}
        </Descriptions.Item>
        <Descriptions.Item label="Tags #">
            { user.tags.length }
        </Descriptions.Item>
    </Descriptions>
    )
}