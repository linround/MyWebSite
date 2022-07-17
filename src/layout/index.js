import React, {useState} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import { SideNav } from "./sideNav";
import { HeaderBar} from "./headerBar";
import {userSelector} from "../store/user";
import {useSelector} from "react-redux";

const {Header, Content, Sider, Footer } = Layout
export default function MyLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const user = useSelector(userSelector)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout >
      <Sider
        theme={user.theme}
        style={{
          height: '100vh'
        }}
        collapsed={collapsed}>
        <SideNav />
      </Sider>
      <Layout>
        <Header style={{
          padding: 0,
        }}>
          <HeaderBar onToggle={toggle}></HeaderBar>
        </Header>
        <Content>
          <Outlet></Outlet>
        </Content>
        <Footer>
          @linyuan
        </Footer>
      </Layout>
    </Layout>
  )
}