import React, { useEffect } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAsyncTodos } from '../features/todos/todoSlice'

function TodoList() {
    const { todos, loading, error } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAsyncTodos())
    }, [])

    console.log(todos)

    if (loading) return <h1>Loading ...</h1>
    if (error) return <h1>{error}</h1>

    return (
        <div className='mt-4'>
            <h1 className='text-lg font-bold text-center'>Todos</h1>
            <div>
                {todos?.map(todo => {
                    return (
                        <TodoItem key={todo.id} todo={todo} />
                    )
                })}
            </div>
        </div>
    )
}

export default TodoList


