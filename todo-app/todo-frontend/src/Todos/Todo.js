import React from "react";

const Todo = ({ todo }) => {

    console.log(todo)

    return(
        <div>
            {todo.text}
        </div>
    )
}

export default Todo;