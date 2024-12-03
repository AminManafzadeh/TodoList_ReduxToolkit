import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAsyncTodos } from '../features/todos/todoSlice'

function AddTodo() {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useDispatch()

    const handleAddTodo = (e) => {
        e.preventDefault()
        if (!inputValue) return
        dispatch(addAsyncTodos({ title: inputValue }))
        setInputValue("")
    }

    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="value" className='block my-2 font-semibold text-lg'>Name :</label>
                <input
                    type="text"
                    placeholder='Add a new Todo ...'
                    value={inputValue}
                    id='value'
                    onChange={(e) => setInputValue(e.target.value)}
                    className='p-4 rounded-lg outline-none border border-solid border-gray-400 w-[400px] my-2 
                    focus:border-blue-300'
                />
                <div>
                    <button className='px-3 py-1 rounded-lg bg-blue-600 text-white text-base font-medium
                     tracking-[1px] hover:tracking-[0] transition-all duration-300 ease-out my-2'>
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTodo