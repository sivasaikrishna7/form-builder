import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import './Home.css'
import { motion } from 'framer-motion'
import objData from './store'
import { MdDelete } from 'react-icons/md'
import Template from './Template'
import './global.css'
import GetContext from '../Components/GetContext'

const Home = (props) => {
  const { tab, setTab } = props
  const [state, setState] = useState(objData)

  const [newId, setNewId] = useState(uuid())
  const [columns, setColumns] = useState([])
  const [type, setType] = useState('')
  const [template_name, setTemplateName] = useState('')
  const [label, setLabel] = useState('')
  const [itemsFromBackend, setitemsFromBackend] = useState([])
  const [characters, updateCharacters] = useState(columns)
  //   const [tab, setTab] = useState('formBuilder')

  const changeLabel = (e) => {
    setLabel(e.target.value)
  }

  const getLabel = (param) => {
    switch (param) {
      case 'text':
        return 'Text'
      case 'int':
        return 'Int'
      default:
        return ''
    }
  }

  const onChangeHandler = (arg) => {
    if (itemsFromBackend.length !== 0 && state.field.length === 0) {
      alert('Add your step')
      return
    }
    setType(arg)
    setitemsFromBackend([...itemsFromBackend, { id: newId, type: arg }])
  }

  const RemoveField = (id) => {
    const filteredPeople = itemsFromBackend.filter((item) => item.id !== id)
    setitemsFromBackend(filteredPeople)
    if (label.length === 0 && itemsFromBackend.length === state.field.length) {
      state.field.splice(
        state.field.findIndex(function (i) {
          return i.id === id
        }),
        1,
      )
      console.log(state)
      return
    }

    if (label.length > 0 && itemsFromBackend.length === state.field.length) {
      state.field.splice(
        state.field.findIndex(function (i) {
          return i.id === id
        }),
        1,
      )
    }
    console.log(state)
  }

  const changeTempName = (e) => {
    setTemplateName(e.target.value)
  }

  const onsubmitHandler = () => {
    if (template_name.length === 0) {
      alert('Enter the Template Name!')
      return
    }
    if (itemsFromBackend.length === 0) {
      alert('Please Add a Field!')
      return
    }
    if (label.length === 0) {
      alert('Enter the Label')
      return
    }
    setState({
      template_name: template_name,
      field: [
        ...state.field,
        {
          id: newId,
          label: label,
          type: type,
        },
      ],
    })
    setLabel('')
    setNewId(uuid())
  }

  useEffect(() => {
    setColumns({
      [uuid()]: {
        name: 'Todo',
        items: itemsFromBackend,
      },
    })
  }, [itemsFromBackend, state])

  useEffect(() => {
    console.log(state)
  }, [state])
  const handleOndragEnd = (result) => {
    const items = Array.from(characters)
    const [reoderedItems] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reoderedItems)

    updateCharacters(items)
  }
  useEffect(() => {
    if (tab === 'formBuilder' && itemsFromBackend.length === 0) {
      setState(objData)
    }
  }, [tab, itemsFromBackend])

  async function handleSubmit() {
    console.log(state)
    console.log('works?')
    let url = `http://localhost:8000/post`
    let res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json',
        // 'Allow-Control-Allow-Origin': '*',
        // 'Credentials': 'same-origin',
      },
    })
      .then((response) => {
        console.log('sending from front', response.json())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onhandleSubmit = async (e) => {
    e.preventDefault()
    console.log(state)

    await handleSubmit()
    setTab('createdForm')
    setTemplateName('')
    setitemsFromBackend([])

    // setState(objData)
  }

  return (
    <>
      <div className="sidenav">
        <h3>Basic Elements</h3>
        <button className="button" onClick={() => onChangeHandler('text')}>
          TEXT
        </button>
        <button className="button" onClick={() => onChangeHandler('int')}>
          INT
        </button>
      </div>
      {tab === 'formBuilder' ? (
        <div className="App">
          <div className="templateForm">
            <motion.div
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="templateName"
            >
              Template Name
            </motion.div>
            <input
              onChange={changeTempName}
              placeholder="Enter Template Name"
              value={template_name}
              className="inputStyle"
            />
          </div>
          <div className="main">
            <DragDropContext onDragEnd={handleOndragEnd}>
              {Object.entries(columns).map(([id, column]) => {
                return (
                  <Droppable droppableId={id} key={id}>
                    {(provided) => {
                      return (
                        <form
                          className="flex"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {column.items.map((item, index) => {
                            const isItem = (item1) => {
                              return item1.id === item.id
                            }
                            const element = state.field.find(isItem)
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div className="trail">
                                      <div
                                        className="container"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <GetContext
                                          labelType={item.type}
                                          changeLabel={changeLabel}
                                          getLabel={getLabel}
                                          element={element}
                                        />
                                        <motion.button
                                          whileHover={{ scale: 1.4 }}
                                          whileTap={{ scale: 0.9 }}
                                          style={{
                                            color: 'red',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '5px',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                          }}
                                          onClick={() =>
                                            RemoveField(item.id, state)
                                          }
                                        >
                                          <MdDelete size={'1.5em'} />
                                        </motion.button>
                                      </div>
                                      <br />
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}

                          {provided.placeholder}
                        </form>
                      )
                    }}
                  </Droppable>
                )
              })}
            </DragDropContext>
          </div>
          <div className="buttons">
            <button className="addStepButton" onClick={onsubmitHandler}>
              Add Step
            </button>
            <button className="submitButton" onClick={onhandleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <Template state={state} />
      )}
    </>
  )
}

export default Home
