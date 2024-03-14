"use client";
import { todoListStyle } from "@/app/style";
import { TodoProps, Todos } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import DetailButton from "./DetailButton";
import {
  deleteTodoMutationFunction,
  getTodoList,
  switchTodoMutationFunction,
} from "@/app/queryFunction";

function TodoList({ isActive }: TodoProps) {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todos[], Error>({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  const switchTodoMutation = useMutation({
    mutationFn: switchTodoMutationFunction,
  });

  const onClickSwitchTodoHandler = (id: string, isDone: boolean) => {
    switchTodoMutation.mutate(
      { id, isDone },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["todos"],
          });
        },
      }
    );
  };

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoMutationFunction,
  });

  const onClickDeleteTodoHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteTodoMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
      });
    }
  };
  const buttonColor = (): string => {
    return isActive ? todoListStyle.cancelButton : todoListStyle.doneButton;
  };

  if (isLoading) return <div>로딩중....</div>;
  if (isError) return <div>Error fetching data</div>;
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
