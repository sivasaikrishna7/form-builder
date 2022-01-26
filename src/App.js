import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import "./App.css";
import { motion } from "framer-motion";
import objData from "./store";
import { MdDelete } from "react-icons/md";
import handleSubmit from "./Logic";
import "./global.css";
import GetContext from "./components/GetContext";

function App() {
  const [state, setState] = useState(objData);
  const [newId, setNewId] = useState(uuid());
  const [columns, setColumns] = useState([]);
  const [type, setType] = useState("");
  const [template_name, setTemplateName] = useState("");
  const [label, setLabel] = useState("");
  const [itemsFromBackend, setitemsFromBackend] = useState([]);

  const changeLabel = (e) => {
    setLabel(e.target.value);
  };

  const getLabel = (param) => {
    switch (param) {
      case "text":
        return "Text";
      case "int":
        return "Int";
      default:
        return "";
    }
  };

  const onChangeHandler = (arg) => {
    if (itemsFromBackend.length !== 0 && state.field.length === 0) {
      alert("Add your step");
      return;
    }
    setType(arg);
    setitemsFromBackend([...itemsFromBackend, { id: newId, type: arg }]);
  };

  const removeField = (id) => {
    const filteredPeople = itemsFromBackend.filter((item) => item.id !== id);
    setitemsFromBackend(filteredPeople);
    if (label.length > 0) {
      state.field.splice(
        state.field.findIndex((a) => a.id === id),
        1
      );
    }
  };

  const changeTempName = (e) => {
    setTemplateName(e.target.value);
  };

  const onsubmitHandler = () => {
    if (template_name.length === 0) {
      alert("Enter the Template Name!");
      return;
    }
    if (itemsFromBackend.length === 0) {
      alert("Please Add a Field!");
      return;
    }
    if (label.length === 0) {
      alert("Enter the Label");
      return;
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
    });
    setLabel("");
    setNewId(uuid());
  };

  useEffect(() => {
    setColumns({
      [uuid()]: {
        name: "Todo",
        items: itemsFromBackend,
      },
    });
  }, [itemsFromBackend, state]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const onhandleSubmit = () => {
    setTemplateName("");
    setitemsFromBackend([]);
    setState(objData);
    handleSubmit(state);
  };

  return (
    <>
      <div className="sidenav">
        <h3>Basic Elements</h3>
        <button className="button" onClick={() => onChangeHandler("text")}>
          TEXT
        </button>
        <button className="button" onClick={() => onChangeHandler("int")}>
          INT
        </button>
      </div>
      <div className="App">
        <div className="templateForm">
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
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
          <DragDropContext onDragEnd={(result) => console.log(result)}>
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
                            return item1.id === item.id;
                          };
                          const element = state.field.find(isItem);
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
                                          color: "red",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "5px",
                                          border: "none",
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => removeField(item.id)}
                                      >
                                        <MdDelete size={"1.5em"} />
                                      </motion.button>
                                    </div>
                                    <br />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </form>
                    );
                  }}
                </Droppable>
              );
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
    </>
  );
}

export default App;
