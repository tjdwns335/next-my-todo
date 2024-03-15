"use client";
import { todoListStyle } from "@/app/style";
import React from "react";
import DetailButton from "./DetailButton";
import Loading from "./Loading";
import Error from "./Error";
import {
  useDeleteTodoMutation,
  useSwitchTodoMutation,
  useTodosQuery,
} from "@/app/querys";

import type { TodoProps } from "@/app/types";

function TodoList({ isActive }: TodoProps) {
  const { todos, isLoading, isError } = useTodosQuery();
  const { switchTodo } = useSwitchTodoMutation();
  const { deleteTodo } = useDeleteTodoMutation();

  const onClickSwitchTodoHandler = (id: string, isDone: boolean) => {
    switchTodo(id, isDone);
  };

  const onClickDeleteTodoHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteTodo(id);
    }
  };
  const buttonColor = (): string => {
    return isActive ? todoListStyle.cancelButton : todoListStyle.doneButton;
  };

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError)
    return (
      <>
        <Error />
      </>
    );
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
                <div>
                  <button
                    className={buttonColor()}
                    onClick={() =>
                      onClickSwitchTodoHandler(todo.id, todo.isDone)
                    }
                  >
                    {isActive ? "취소" : "완료"}
                  </button>
                  <button
                    className={todoListStyle.deleteButton}
                    onClick={() => {
                      onClickDeleteTodoHandler(todo.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
                <DetailButton todoId={todo.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TodoList;
