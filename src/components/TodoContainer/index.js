import React, { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "./TodoList";

// const todoList = [
//     {
//         id: 1,
//         title: "Learn React",
//         done: true
//     },
//     {
//         id: 2,
//         title: "Create a todo app",
//         done: false
//     },
// ]



const TodoContainer = () => {
    const [data,setData]=useState([]);
    const [todos, setTodos] = useState(data);
    const handleAddTodo = (newTodo) => {
        const newTodoList = [...todos, newTodo]
        setTodos(newTodoList);
    }

    const handleRemoveTodo = (id) => {
        const removeTodoList = todos.filter(todo => todo.id !== id);
        setTodos(removeTodoList)
    }

    const handleCheckboxChange = (id) => {
        const checkedTodoList = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done }
            }
            return todo;
        })
        setTodos(checkedTodoList)
    }     
    return (
        <div>
            <h4>My Todo List</h4>
            {todos?.length
                ?
                todos.map((todo, index) => (
                    <div key={index}>
                        <Todo                            
                            todo={todo}
                            removeTodo={handleRemoveTodo}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                ))
                :
                <p >Hey !! add your work todo ...</p>
            }
            <AddTodo addTodo={handleAddTodo}  setData={setData} />
        </div>
    )
}

export default TodoContainer;