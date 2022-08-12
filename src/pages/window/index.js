import React from 'react'
import styles from './style.less'
import { AppItem } from './component/appItem'
import { FooterMenuItem } from './component/footerMenuItem'
import {
  InteractionOutlined, WechatOutlined, TeamOutlined,
  WindowsOutlined, SearchOutlined
} from '@ant-design/icons'

function WeiXin() {
  const github = 'https://github.com/linyuan1105'
  return (
    <div className={styles.wxContent}>
      姓名：林园 <br/>
      电话：18811786170 <br/>
      微信：18811786170 <br/>
      Github：<a href={github} target={'_blank'} rel="noreferrer">{ github}</a>
    </div>
  )
}

function WindowPage() {
  return (
    <div className={styles.windowContainer}>
      <div className={styles.windowBody}>
        <AppItem appName='微信' dialogContent={<WeiXin />}>
          <WechatOutlined />
        </AppItem>
        <AppItem appName='回收站' >
          <InteractionOutlined />
        </AppItem>
        <AppItem appName='此电脑' >
          <TeamOutlined />
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
    </div>
  )
}
export { WindowPage }
