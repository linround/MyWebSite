import React, { useEffect, useState } from 'react'
import { FolderTree } from './FolderTree'
import { FolderItems } from './FolderItems'
import styles from './styles.less'
import {
  blogsSelector, githubSelector, setCurrentModule
} from '../../../../store/blog'
import { useDispatch, useSelector } from 'react-redux'


export function FolderBody() {
  const blogs = useSelector(blogsSelector)
  const github = useSelector(githubSelector)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('')
  const [items, setItems] = useState([])
  const onSelected = (data) => {
    setSelected(data)
    dispatch(setCurrentModule(data))
  }
  useEffect(() => {
    switch (selected) {
    case 'blogs':
      setItems(blogs)
      break
    case 'github':
      setItems(github)
      break
    }
  }, [blogs, github, selected])
  const treeNodes = [
    {
      title: 'blogs',
      children: blogs,
      id: 'blogs',
    },
    {
      title: 'github',
      id: 'github',
      children: github,
    }
  ]
  return (
    <div className={styles.folderBodyContainer}>
      <FolderTree treeNodes={treeNodes} onSelected={onSelected}  />
      <FolderItems items={items} />
    </div>
  )
}
