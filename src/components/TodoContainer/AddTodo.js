import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import { Form } from 'reactstrap';

const AddTodo = ({ addTodo }) => {

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
    }

    return (
        <div>
            <Form>
                <Input
                    type='text'
                    placeholder='Enter something here...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type='submit' className='float-end btn btn-dark fw-bold' onClick={(e) => { handleSubmit(e) }}>
                    +
                </button>
            </Form>
        </div>
    )
}

export default AddTodo