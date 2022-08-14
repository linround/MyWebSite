import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import styles from './style.less'

export const BasicReactSortable = () => {
  const [state, setState] = useState([
    { id: 1, name: '1', },
    { id: 2, name: '2', },
    { id: 3, name: '3', },
    { id: 4, name: '4', },
    { id: 5, name: '5', },
    { id: 6, name: '6', },
    { id: 7, name: '7', }
  ])

  return (
    <ReactSortable list={state} setList={setState}>
      {state.map((item) => (
        <div className={styles.ReactSortableItem} key={item.id}>{item.name}</div>
      ))}
    </ReactSortable>
  )
}
