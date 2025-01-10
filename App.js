import './App.css';
import { useState } from 'react';

function App() {
  let [todolist, setTodolist] = useState([])
  let saveToDoList = (event) => {

    let toname = event.target.toname.value;
    if (!todolist.includes(toname)) {
      let finalDolist = [...todolist, toname]
      setTodolist(finalDolist)

    }
    else {
      alert("ToDo Name list...")
    }

    event.preventDefault();
  }

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItem value={value} key={index} indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    )
  })
  return (
    <div className="App">
      <h1>To Do List in React</h1>
      <form onSubmit={saveToDoList}>
        <input className='textbox' type='text' placeholder='Enter your value' name='toname' />
        <button className='btn'>save</button>
      </form>

      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItem({ value, indexNumber, todolist, setTodolist }) {
  let [status, setStatus] = useState(false)
  let deleteRow = () => {
    let finalData = todolist.filter((v, i) => i != indexNumber)
    setTodolist(finalData)

  }
  let checkStatus = () => {
    setStatus(!status)

  }
  return (

    <li className={(status) ? 'completetodo' : ''} onClick={checkStatus}>{indexNumber + 1} {value}<span onClick={deleteRow}>&times;🚮</span></li>
  )
}