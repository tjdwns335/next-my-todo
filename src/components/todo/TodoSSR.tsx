import { Todos } from "@/app/types";
import React from "react";

const TodoSSR = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos: Todos[] = await response.json();
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h1>{todo.isDone ? "다 한 일☑️" : "해야 할 일🔥"}</h1>
            <h2>{todo.title}</h2>
            <p>{todo.contents}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoSSR;
