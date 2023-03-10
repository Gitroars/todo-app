import React from "react";
import "./App.css";
import {ImCheckmark,ImCross} from 'react-icons/im'
import PageTitle from "./components/PageTitle";

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

  return (
    <div className="app">
      <div className="main-title">
        <PageTitle></PageTitle>
      </div>
      <div className="todo-list">
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