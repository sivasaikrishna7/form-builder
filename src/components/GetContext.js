import React from 'react'
import '../Pages/global.css'
import './GetContext.css'

const GetContext = (props) => {
  const { labelType, changeLabel, getLabel, element } = props
  const typeLabel = getLabel(labelType)
  if (element) {
    return (
      <div className="contextLabel">
        {element.label} <span>({element.type})</span>
      </div>
    )
  }
  return (
    <div className="context">
      <div className="contextLabel"> {typeLabel} Label</div>
      <input
        type="text"
        onChange={changeLabel}
        placeholder="Enter Label"
        className="inputStyle"
      />
    </div>
  )
}

export default GetContext
