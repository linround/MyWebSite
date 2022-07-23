import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './article.scss'

Index.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}
export default function Index({ title, content, })  {
  const [expanded, setExpanded] = useState(false)
  const [isClick, setClick] = useState(false)
  const [className, setClassName] = useState('')
  const handleExpanded = () => {
    setExpanded(!expanded)
    setClick(true)
  }

  useEffect(() => {
    if (expanded) {
      setClassName('node-js-article-box-expanded')
    } else if (!expanded && isClick) {
      setClassName('node-js-article-box-not-expanded')
    }
  }, [expanded, isClick])
  return (
    <>
      <div className={ `node-js-article-box ${className}`} onClick={handleExpanded}>
        <article>
          <h1 className='node-js-article-title'>{ title }</h1>
          <p>{ content }</p>
        </article>
      </div>
    </>
  )
}
