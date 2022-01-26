import React from 'react'

import './GetContext.css'

const GetContext = (props) => {
  const { labelType, changeLabel, getLabel, element } = props
  const typeLabel = getLabel(labelType)
  if (element) {
    return <div>{element.label}</div>
  }
  return (
    <div className="context">
      <div className="contextLabel"> {typeLabel} Label</div>
      <input type="text" onChange={changeLabel} />
    </div>
  )
}

export default GetContext
