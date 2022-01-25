import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import './App.css'
import { motion } from 'framer-motion'
import objData from './store'
import { IoClose } from 'react-icons/io5'
import handleSubmit from './Logic'

function App() {
  const [state, setState] = useState(objData)
  const [newId, setNewId] = useState(uuid())
  const [columns, setColumns] = useState([])
  const [type, setType] = useState('')
  const [template_name, setTemplateName] = useState('')
  const [label, setLabel] = useState('')
  const [itemsFromBackend, setitemsFromBackend] = useState([])
  const changeLabel = (e) => {
    setLabel(e.target.value)
  }

  const getLabel = (param) => {
    switch (param) {
      case 'text':
        return 'TEXT'
      case 'int':
        return 'INT'
      default:
        return ''
    }
  }

  const getContext = (param) => {
    // const inputType = getInputType(param)
    const typeLabel = getLabel(param)
    return (
      <div>
        <h3>{typeLabel} LABEL</h3>{' '}
        <input
          // value={label}
          type="text"
          onChange={changeLabel}
        />
      </div>
    )
  }

  const onChangeHandler = (arg) => {
    setType(arg)

    const newArray = [
      ...itemsFromBackend,
      { id: newId, context: getContext(arg) },
    ]
    // console.log(newArray)
    setitemsFromBackend(newArray)
  }
  const removeField = (id) => {
    console.log(id)
    const filteredPeople = itemsFromBackend.filter((item) => item.id !== id)
    setitemsFromBackend(filteredPeople)
    state.field.splice(
      state.field.findIndex((a) => a.id === id),
      1,
    )
  }
  const changeTempName = (e) => {
    setTemplateName(e.target.value)
  }

  const onsubmitHandler = () => {
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
    setNewId(uuid())
  }
  useEffect(() => {
    // console.log('hi')
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
  //hi
  return (
    <div className="App">
      <center className="templatename">
        <motion.h1
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          Template Name
        </motion.h1>
        <input onChange={changeTempName} placeholder="Template Name" />
      </center>
      <br />
      <div className="sidenav">
        <center>
          <h3>Basic Elements</h3>
        </center>
        <button
          className="button button2"
          onClick={() => onChangeHandler('text')}
        >
          TEXT
        </button>
        <br />
        <button
          className="button button2"
          onClick={() => onChangeHandler('int')}
        >
          INT
        </button>
      </div>
      <div className="main">
        <DragDropContext onDragEnd={(result) => console.log(result)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              // <DragResizeContainer>
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <form
                      className="flex"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div>
                                  <div
                                    className="container"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {item.context}
                                    <motion.button
                                      whileHover={{ scale: 1.4 }}
                                      whileTap={{ scale: 0.9 }}
                                      style={{
                                        color: 'red',
                                      }}
                                      onClick={() => removeField(item.id)}
                                    >
                                      <IoClose />
                                    </motion.button>{' '}
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
              //</DragResizeContainer>
            )
          })}
        </DragDropContext>
      </div>
      <center>
        <button
          className="button22 button21"
          onClick={() => {
            onsubmitHandler()
          }}
        >
          ADD STEP
        </button>
        <br />
        <button
          className="button223 button213"
          onClick={(state) => handleSubmit(state)}
        >
          Submit
        </button>
      </center>
    </div>
  )
}

export default App
