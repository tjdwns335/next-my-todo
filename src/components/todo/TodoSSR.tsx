import { todoListStyle } from "@/app/style";
import React from "react";

import type { TodoProps, Todos } from "@/app/types";

const TodoSSR = async ({ isActive }: TodoProps) => {
  const response = await fetch(`http://localhost:4000/todos`, {
    cache: "no-cache",
  });
  const todos: Todos[] = await response.json();
  return (
    <div className={todoListStyle.wrap}>
      <h1 className={todoListStyle.todoTitle}>
        {isActive ? "다 한 일☑️" : "해야 할 일🔥"}
      </h1>
      <div className={todoListStyle.todoListWrap}>
        {todos
          ?.filter((todo) => todo.isDone === isActive)
          .map((todo) => {
            return (
              <div
                key={todo.id}
                className={todoListStyle.todoContent}
              >
                <h2 className={todoListStyle.todoContentTitle}>{todo.title}</h2>
                <p>{todo.contents}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodoSSR;
