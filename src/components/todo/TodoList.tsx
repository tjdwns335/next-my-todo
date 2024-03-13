"use client";
import {
  deleteTodoMutationFunction,
  getTodoList,
  switchTodoMutationFunction,
} from "@/app/queryFunction";
import { TodoProps, Todos } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

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

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoMutationFunction,
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

  if (isLoading) return <div>로딩중....</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      <h1>{isActive ? "다 한 일☑️" : "해야 할 일🔥"}</h1>
      {todos
        ?.filter((todo) => todo.isDone === isActive)
        .map((todo) => {
          return (
            <div key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.contents}</p>
              <button
                onClick={() => onClickSwitchTodoHandler(todo.id, todo.isDone)}
              >
                {isActive ? "완료" : "취소"}
              </button>
              <button
                onClick={() => {
                  onClickDeleteTodoHandler(todo.id);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;
