import React from 'react'
import styles from './style.less'
import { AppItem } from './component/appItem'
import {
  InteractionOutlined, WechatOutlined, TeamOutlined
} from '@ant-design/icons'

function WindowPage() {
  return (
    <div className={styles.windowContainer}>
      <div className={styles.windowBody}>
        <AppItem appName='微信' >
          <WechatOutlined />
        </AppItem>
        <AppItem appName='回收站' >
          <InteractionOutlined />
        </AppItem>
        <AppItem appName='此电脑' >
          <TeamOutlined />
        </AppItem>

      </div>
      <div className={styles.windowFooter}></div>
    </div>
  )
}
export { WindowPage }
