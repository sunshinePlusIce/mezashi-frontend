import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AuthenticatedRoute from './security/AuthenticatedRoute'
import Login from './Login'
import { theme, Layout, Menu, Breadcrumb, Tree} from 'antd';
import Footer from './Footer';
import { 
  ClockCircleOutlined, 
  CheckOutlined, 
  UserOutlined, 
  FlagOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useState, useContext, useEffect } from 'react';
import AuthProvider from './security/AuthContext';
import axios from 'axios';
import MezashiTreeNode from './MezashiContentWrapper';
import MezashiContentWrapper from './MezashiContentWrapper';

const { Header, Content, Sider } = Layout;
const { TreeNode } = Tree;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [mezashiList, setMezashiList] = useState([]);
    const [currentMenuItem, setCurrentMenuItem] = useState('');
    const [currentMezashi, setCurrentMezashi] = useState({});
    const client = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`
    });
    // update mezashiList to a format that tree accepts
    // mList is a list holding mezashi
    // prefixKeys is a list helping to generating keys, just start with []
    const updateMezashiList = (mList, prefixKeys, duplicatedId) => {
      mList.forEach((mezashi, index) => {
        // push all the children's id into an array
        if (prefixKeys.length > 0 && !duplicatedId.includes(mezashi.id))
          duplicatedId.push(mezashi.id)
        mezashi.key = [...prefixKeys, index].join('-');
        if (mezashi.children.length > 0)
          updateMezashiList(mezashi.children, [...prefixKeys, index], duplicatedId)
      })
    }
    
    const {
      token: { colorBgContainer }
    } = theme.useToken();

    useEffect(() => {
      const fetchMezashiList = async () => {
        let response = await client.get(`users/1/mezashi`);
        let mezashiData = response.data;
        let childrenId = [];
        updateMezashiList(mezashiData, [], childrenId);
        mezashiData = mezashiData.filter(mezashi => !childrenId.includes(mezashi.id)) 
        setMenuItems([
          getItem('Profile', 'profile', <UserOutlined />), 
          getItem('Mezashi', 'mezashi', <FlagOutlined />, mezashiData.map((item, index) => { 
              return getItem(item.name, index, item.done ? <CheckOutlined /> : <ClockCircleOutlined />)
          }))
        ])
        setMezashiList(mezashiData);
      }
      fetchMezashiList();
    }, [])
    const handleMenuOnClick = ({ item, key, keyPath}) => {
      // handle click on profile
      if (keyPath.length === 1 && keyPath[keyPath.length-1] === 'profile') {
        setCurrentMenuItem('profile');
      }
      // handle click on mezashi list
      if (keyPath.length > 1 && keyPath[keyPath.length-1] === 'mezashi') {
        setCurrentMenuItem('mezashi');
        let mezashiIndex = Number(keyPath[keyPath.length - 2]);
        setCurrentMezashi(mezashiList[mezashiIndex]);
      }
    }

    const renderTree = (mList) => {
      return (
          mList.map(mezashi => {
            return (
            <TreeNode 
              key={mezashi.key}
              title={<MezashiContentWrapper mezashi={mezashi} />}>
                {
                  (mezashi.children && mezashi.children.length > 0) && renderTree(mezashi.children)
                }
            </TreeNode>
            )
        }) 
      )
    }
    return (
      <Layout style={{
        minHeight: '100vh'
      }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value)=>setCollapsed(value)}>

          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={menuItems}
            onClick={handleMenuOnClick}>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content style={{
            margin: '0 16px'
          }}>
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
  
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Tree
                showLine
                switcherIcon={<DownOutlined />}
              >
                {currentMenuItem === 'mezashi' && renderTree([currentMezashi])}
              </Tree>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  
}

export default function MezashiApp() {
    return (
        <div className="mezashi-app">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={
                            <AuthenticatedRoute to='/login'>
                                <Main />
                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path='/login' element={<Login/>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}