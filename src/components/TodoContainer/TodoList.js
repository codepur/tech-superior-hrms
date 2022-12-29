import React, { useState } from 'react';
import { Button, Input, InputGroup } from "react-bootstrap";

const Todo = ({ todo, removeTodo, handleCheckboxChange }) => {
    return (
        <div className="my-4 input-group">
            {/* <InputGroup> */}
                <input
                    type='checkbox'
                    className="me-4 bg-"
                    checked={todo.done}
                    onChange={() => { handleCheckboxChange(todo.id) }}
                />
                <span className={todo.done ? 'text-decoration-line-through fs-5 fst-italic form-control' : 'fs-5 form-control'}>{todo.title}</span>
                <Button
                    className="float-end btn btn-danger fw-bold"
                    onClick={() => { removeTodo(todo.id) }} > x
                </Button>
            {/* </InputGroup> */}
        </div>
    )
}

export default Todo