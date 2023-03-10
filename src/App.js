import React, { useEffect,useMemo,useState } from "react";
import "./App.css";
import {ImCheckmark,ImCross} from 'react-icons/im'
import PageTitle from "./components/PageTitle";
import { act, isCompositeComponentWithType } from "react-dom/test-utils";



function Todo({ todo,index,completeTodo,removeTodo}) {
  return (
    <div className="todo"
    style={{textDecoration:todo.isCompleted? "line-through":""}}>
      {todo.text}
      <div>
        <button onClick={()=>completeTodo(index)}><ImCheckmark/></button>
        <button onClick={()=>removeTodo(index)}><ImCross/></button>
      </div>
    </div>
  );
};



function TodoForm({addTodo}){
  const [value,setValue] = React.useState("");
  const handleSubmit = e =>{
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  };

  return(
    <form onSubmit={handleSubmit}>
      <input type="text"
      className="input"
      value={value}
      onChange={e=>setValue(e.target.value)}
      />
      {/* A button that adds a new task */}
      <button onClick={handleSubmit}>Enter</button>
      
    </form>
    
  );
}






function App() {
  const [todos, setTodos] = React.useState([
    {text:"Create your first to do", isCompleted:false}
  ]);
  
  {/*Add a new task*/}
  const addTodo = text =>{
    const newTodos = [...todos,{text}];
    setTodos(newTodos);
  };
  {/*Update the status of a task to completed */}
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  {/*Remove a task*/}
  const removeTodo = index =>{
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }

  
  

  const activeTodos = todos.filter(
    (e)=> e.isCompleted === false
  );

  const completedTodos = todos.filter(
    (e) => e.isCompleted === true
  );

  function showActive(){
    setTodos(activeTodos);
  }
  function showCompleted(){
    setTodos(completedTodos);
  }
  function showAll(){
    setTodos(todos);
  }
 

  
  

  return (
    <div className="app">
      <div className="main-title">
        <PageTitle></PageTitle>
      </div>
    
      <div className="todo-list">
        <button>Completed</button>
        <button >Active</button>
        <button >All</button>

      <TodoForm addTodo={addTodo}/>
      
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo = {completeTodo}
            removeTodo = {removeTodo}
          />
        ))}
        
      </div>
    </div>
  );
}

export default App;