import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todos, companyInfo } from "../types";
import {
  deleteTodoMutationFunction,
  getCompanyInfo,
  getTodoById,
  getTodoList,
  newTodoMutationFunction,
  switchTodoMutationFunction,
} from "../queryFunction";
import { useState } from "react";

export const useTodosQuery = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todos[], Error>({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });
  return { todos, isLoading, isError };
};

export const useTodosQueryById = (id: string) => {
  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery<Todos[], Error>({
    queryKey: ["todos"],
    queryFn: () => getTodoById(id),
  });
  return { todo, isLoading, isError };
};

export const useCompanyInfoQuery = () => {
  const {
    data: companyInfo,
    isLoading,
    isError,
  } = useQuery<companyInfo, Error>({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });
  return { companyInfo, isLoading, isError };
};

export const useSwitchTodoMutation = () => {
  const queryClient = useQueryClient();

  const switchTodoMutation = useMutation({
    mutationFn: switchTodoMutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const switchTodo = (id: string, isDone: boolean) => {
    switchTodoMutation.mutate({ id, isDone });
  };

  return { switchTodo };
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoMutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };
  return { deleteTodo };
};

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const newTodoMutation = useMutation({
    mutationFn: newTodoMutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      setContents("");
    },
  });

  return { title, setTitle, contents, setContents, newTodoMutation };
};
