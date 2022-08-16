import React, { useState } from 'react'
import styles from './style.less'

export function DragDemo() {
  const [dragData, setDragData] = useState('')
  const [data] = useState('da lin')
  // 开始推拽一个元素时触发 (只能用在被拖拽的元素上面)
  const onDragStart = (ev, name) => {
    console.log('onDragStart', name)
    ev.currentTarget.style.border = '20px'

    ev.dataTransfer.setData('text', data)
    ev.effectAllowed = 'copyMove'
  }
  // 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (只能用在被拖拽的元素上面)
  const onDragEnd = (ev, name) => {
    console.log(
      'onDragEnd Data', ev.dataTransfer.getData('text'), name
    )
    ev.target.style.border = 'solid black'
    ev.dataTransfer.clearData()
  }


  // 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次
  const onDragOver = (ev, name) => {
    console.log(
      'onDragOver Data', ev.dataTransfer.getData('text'), name
    )
    ev.currentTarget.style.background = 'blue'
    ev.preventDefault()
  }
  // 当元素或选中的文本在可释放目标上被释放时触发
  const onDrop = (ev, name) => { // onDrop的调用是在被放置的目标元素上 在onDrop上才可以获取到数据
    const data =  ev.dataTransfer.getData('text')
    console.log(
      'onDrop Data', data, name
    )
    setDragData(data)
    ev.preventDefault()
  }


  // 当拖拽元素或选中的文本到一个可释放目标时触发
  const onDragEnter = (ev, name) => {
    console.log(
      'onDragEnter Data', ev.dataTransfer.getData('text'), name
    )
  }
  // 当拖拽元素或选中的文本离开一个可释放目标时触发。
  const onDragLeave = (ev, name) => {
    console.log(
      'onDragLeave Data', ev.dataTransfer.getData('text'), name
    )
  }
  // 当拖拽元素或选中的文本时触发。
  const onDrag = (ev, name) => {
    console.log(
      'onDrag Data', ev.dataTransfer.getData('text'), name
    )
  }
  return (
    <>
      <h1>Drag</h1>
      <div>
        <div
          draggable
          className={styles.DragItem}
          onDragStart={(e) => onDragStart(e, 'source')}
          onDragEnd={(e) => onDragEnd(e, 'source')}
          onDragOver={(e) => onDragOver(e, 'source')}
          onDrop={(e) => onDrop(e, 'source')}
          onDragEnter={(e) => onDragEnter(e, 'source')}
          onDragLeave={(e) => onDragLeave(e, 'source')}
          onDrag={(e) => onDrag(e, 'source')}
        >
          { data }
        </div>
        <div
          className={styles.DragContainer}
          onDragStart={(e) => onDragStart(e, 'target')}
          onDragEnd={(e) => onDragEnd(e, 'target')}
          onDragOver={(e) => onDragOver(e, 'target')}
          onDrop={(e) => onDrop(e, 'target')}
          onDragEnter={(e) => onDragEnter(e, 'target')}
          onDragLeave={(e) => onDragLeave(e, 'target')}
          onDrag={(e) => onDrag(e, 'target')}
        >
          {dragData}
        </div>
      </div>
    </>
  )
}
