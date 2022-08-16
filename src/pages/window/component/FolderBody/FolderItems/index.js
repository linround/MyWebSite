import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import PropTypes from 'prop-types'
import scrollStyles from '../../../style.less'
import { MyIcon } from '../../../../../components/Icon'
import { ReactSortable } from 'react-sortablejs'
import { moduleSelector, setBlogItem } from '../../../../../store/blog'
import { useSelector, useDispatch } from 'react-redux'

export function FolderItems(props) {
  const dispatch = useDispatch()
  const currentModule = useSelector(moduleSelector)
  const items = props.items || []
  const [state, setState] = useState([...items])
  const onSort = () => {
    dispatch(setBlogItem({
      type: currentModule,
      data: state.map((item) => item.toString()),
    }))
  }

  useEffect(() => {
    setState(items)
  }, [items])

  const onDragStart = (ev, key) => {
    ev.dataTransfer.setData('text', key)
  }
  return (
    <ReactSortable
      list={state}
      animation={200}
      onSort={onSort}
      delayOnTouchStart={true}
      delay={2}
      setList={setState}
      className={`${styles.FolderItemsContainer}  ${scrollStyles.ScrollStyle}`}>
      {state && state.map((item) => (
        <div key={item} className={styles.FolderItemsItem} onDragStart={(e) => onDragStart(e, item)}>
          <div className={styles.FolderItemsItemIcon}>
            <MyIcon iconName='faFolderClosed'></MyIcon>
          </div>
          <div className={styles.FolderItemsItemText}>{item}</div>
        </div>
      ))}
    </ReactSortable>
  )
}

FolderItems.propTypes = {
  items: PropTypes.array,
}
