import React, { useState } from 'react'
import './CreatedTemplates.css'

import { useNavigate } from 'react-router-dom'
import SavedTemplate from './SavedTemplate'

const Templates = [
  {
    template_name: 'Google From 1',
    field: [
      {
        id: '1',
        label: 'Name',
        type: 'text',
      },
      {
        id: '2',
        label: 'Age',
        type: 'number',
      },
      {
        id: '3',
        label: 'Address',
        type: 'text',
      },
    ],
  },
  {
    template_name: 'Google From 2',
    field: [
      {
        id: '1',
        label: 'Name',
        type: 'text',
      },
      {
        id: '2',
        label: 'Salary',
        type: 'number',
      },
      {
        id: '3',
        label: 'Work Location',
        type: 'text',
      },
    ],
  },
  {
    template_name: 'Google From 3',
    field: [
      {
        id: '1',
        label: 'Name',
        type: 'text',
      },
      {
        id: '2',
        label: 'Experience',
        type: 'number',
      },
      {
        id: '3',
        label: 'Education',
        type: 'text',
      },
    ],
  },
  {
    template_name: 'Google From 4',
    field: [
      {
        id: '1',
        label: 'Name',
        type: 'text',
      },
      {
        id: '2',
        label: 'Rank',
        type: 'number',
      },
      {
        id: '3',
        label: 'College',
        type: 'text',
      },
    ],
  },
]

const CreatedTemplates = () => {
  const navigate = useNavigate()
  const [bool, setBool] = useState(false)
  const handleClick = () => navigate('/FormBuilder')
  return (
    <>
      <div className="sidenav">
        <h3>Templates</h3>
        <button
          className="button"
          onClick={() => {
            setBool(true)
          }}
        >
          Template 1
        </button>
        <button className="button">Template 2</button>
        <button className="button">Template 3</button>
        <button className="button">Template 4</button>
      </div>
      <div className="formholder">
        <button className="createbutton" type="button" onClick={handleClick}>
          Create New Template
        </button>
        {bool === true ? (
          <SavedTemplate
            template_name={Templates[0].template_name}
            id={Templates[0].id}
            label={Templates[0].field.label}
            type={Templates[0].field.type}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default CreatedTemplates
