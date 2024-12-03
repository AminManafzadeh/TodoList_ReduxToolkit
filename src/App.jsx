
import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {


  return (
    <div className='flex flex-col items-center justify-center w-full h-full '>
      <h1 className='font-bold text-black text-xl'>Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
