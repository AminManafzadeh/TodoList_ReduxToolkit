import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAsyncTodos, toggleAsyncTodos } from '../features/todos/todoSlice'

function TodoItem({ todo }) {
    const { id, title, completed } = todo
    const dispatch = useDispatch()
    console.log(id)

    const handleDelete = () => {
        dispatch(deleteAsyncTodos({ id }))
    }

    const handleToggle = () => {
        dispatch(toggleAsyncTodos({ id, completed: !completed, title }))
    }

    return (
        <div className='flex items-center justify-between outline-none border border-solid border-gray-400
        rounded-lg p-4 my-2 w-[400px]'>
            <div className='flex items-center'>
                <input
                    onChange={handleToggle}
                    type="checkbox"
                    className='mr-2'
                    checked={completed}
                />
                <h3 className={`text-lg font-semibold text-black ${completed && "line-through opacity-35"}`}>{title}</h3>
            </div>

            <button
                onClick={handleDelete}
                className='px-3 py-1 rounded-lg bg-red-500 text-white font-semibold text-lg'>
                Delete
            </button>
        </div>
    )
}

export default TodoItem