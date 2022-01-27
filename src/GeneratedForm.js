import React from 'react'
const dummydata = {
  template_name: 'google form',
  field: [
    {
      id: 1,
      label: 'name',
      type: 'text',
    },
    {
      id: 2,
      label: 'age',
      type: 'int',
    },
  ],
}
const GeneratedForm = (props) => {
  if (dummydata.field.type == 'text') {
    return <div></div>
  }
  return <div></div>
}

export default GeneratedForm
