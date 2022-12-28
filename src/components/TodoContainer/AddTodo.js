import { Input } from '@material-ui/core';
import React, { useState } from 'react';

const AddTodo = ({ addTodo, setData }) => {

    const [title, setTitle] = useState();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: Math.random(),
            title: title,
            done: false
        }
        addTodo(newTodo);
        setTitle("")
        setData(newTodo);
    }

    return (
        <div>
            <form>
                <Input
                    type='text'
                    placeholder='Enter something here...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button className='float-end btn btn-dark fw-bold' onClick={(e)=>{handleSubmit(e)}}>
                    +
                </button>
            </form>
        </div>
    )
}

export default AddTodo