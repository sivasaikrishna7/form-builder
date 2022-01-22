import React,{useState} from "react";
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import './App.css';
import DragResizeContainer from 'react-drag-resize';


function App() {
 
  const [itemsFromBackend,setitemsFromBackend] = useState([]);
  const onChangehandler = () => {
    const newArray = [...itemsFromBackend,{id:uuid(),context:<div><label>undefined</label><br/>
      <input placeholder='Add your text here'/></div>}];
    setitemsFromBackend(newArray);
}
  const columnsFromBackend = 
  {
    [uuid()]:{
      name: 'Todo',
      items: itemsFromBackend
    },
  };
  // const [columns,setColumns] = useState(columnsFromBackend)
  const columns = columnsFromBackend;
  return (
    <div>
      <button onClick={()=>onChangehandler()}>TEXT</button>
      <br/>
      <br/>
    <div >
     <DragDropContext onDragEnd={result => console.log(result)}>
       {Object.entries(columns).map(([id,column])=>{
          return (
            // <DragResizeContainer>
            <Droppable  droppableId={id} key={id}>
               {(provided,snapshot)=>{
                  return (
                    <div className="grid"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                     
                      {
                        column.items.map((item,index)=>{
                          console.log(item,item.id)
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided,snapshot)=>{
                                  return(
                                    
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect:'none',
                                      padding:16,
                                      margin:'0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor:snapshot.isDragging?'#263B4A':'#456C86',
                                      color:'white',
                                      ...provided.draggableProps.style
                                    }}
                                    >
                                      { item.context }
                                    </div>
                                    
                                  )
                                }}
                            </Draggable>
                          )
                        })
                      }
                      
                      {provided.placeholder}
                    </div>
                  )
               }}
            </Droppable>
            //</DragResizeContainer> 
          )
       })}
     </DragDropContext>
    </div>
    
    </div>
  );
}

export default App;
