import React from 'react'
import styles from './style.less'
import { AppItem } from './component/appItem'
import { FooterMenuItem } from './component/footerMenuItem'
import {
  InteractionOutlined, WechatOutlined, TeamOutlined, CodeSandboxOutlined,
  WindowsOutlined, SearchOutlined, DesktopOutlined, GithubOutlined, ReadOutlined
} from '@ant-design/icons'
import { addBlogItem, moduleSelector } from '../../store/blog'
import { useDispatch, useSelector } from 'react-redux'
import { ContextModal } from '../../components/ContextModal'
import { WebglItems } from './component/WebglItems'
import { ComponentsItems } from './component/ComponentsItems'

function WeiXin() {
  const github = 'https://github.com/linyuan1105'
  return (
    <div className={styles.APPContentPadding}>
      姓名：林 <br/>
      微信：18811786170 <br/>
      Github：<a href={github} target={'_blank'} rel="noreferrer">{ github}</a>
    </div>
  )
}


function RecycleBin() {
  return (
    <div className={styles.APPContentPadding}>
      计划中·····<br />
      这是一个<strong><a>删除的资料</a></strong>文件夹，以文件夹链接的方式记录不重要或者繁琐的内容
    </div>
  )
}



function WindowPage() {
  const module = useSelector(moduleSelector)
  const dispatch = useDispatch()
  const handleAddBlog = () => {
    dispatch(addBlogItem({
      type: module,
      data: '新建',
    }))
  }
  const githubLink = 'https://github.com/linyuan1105'
  const gitbook = 'https://github.com/linyuan1105/gitBook'
  return (
    <div className={styles.windowContainer}>
      <div className={styles.windowBody}>
        <AppItem dialogId='wx' appName='联系方式' dialogContent={<WeiXin />}>
          <WechatOutlined />
        </AppItem>
        <AppItem dialogId='recycle-bin' appName='回收站' dialogContent={<RecycleBin />} >
          <DesktopOutlined />
        </AppItem>
        <AppItem dialogId='blog' appName='Blog文件信息' onAdd={handleAddBlog}>
          <TeamOutlined />
        </AppItem>
        <AppItem dialogId='Webgl' appName='Webgl' dialogContent={<WebglItems />}>
          <CodeSandboxOutlined />
        </AppItem>
        <AppItem dialogId='components' appName='组件' dialogContent={<ComponentsItems />}>
          <InteractionOutlined />
        </AppItem>

        <AppItem dialogId='GitHub' appName='GitHub' isLink={true}>
          <a href={githubLink} target={'_blank'} rel="noreferrer">
            <GithubOutlined />
          </a>
        </AppItem>
        <AppItem dialogId='gitbook' appName='gitbook' isLink={true}>
          <a href={gitbook} target={'_blank'} rel="noreferrer">
            <ReadOutlined />
          </a>
        </AppItem>

      </div>
      <div className={styles.windowFooter}>
        <div className={styles.windowFooterLeft}>
          <FooterMenuItem>
            <WindowsOutlined />
          </FooterMenuItem>
          <FooterMenuItem>
            <SearchOutlined />
          </FooterMenuItem>
        </div>
        <div className={styles.windowFooterRight}>

          { new Date()
            .toDateString() }
        </div>
      </div>
      <ContextModal />
    </div>
  )
}
export { WindowPage }
