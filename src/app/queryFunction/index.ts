import { TodoData, Todos, companyInfo, newTodo } from "../types";

export const getCompanyInfo = async (): Promise<companyInfo> => {
  const response = await fetch("http://localhost:4000/companyInfo");
  const companyInfo: companyInfo = await response.json();
  return companyInfo;
};

export const getTodoList = async (): Promise<Todos[]> => {
  const response = await fetch("http://localhost:4000/todos");
  const todos: Todos[] = await response.json();
  return todos;
};

export const newTodoMutationFunction = async (newTodo: TodoData) => {
  const response = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  const todo = await response.json();
  return todo;
};

export const switchTodoMutationFunction = async (params: {
  id: string;
  isDone: boolean;
}) => {
  const { id, isDone } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: !isDone }),
  });
  const todo = await response.json();
  return todo;
};

export const deleteTodoMutationFunction = async (id: string) => {
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTodoById = async (id: string): Promise<Todos[]> => {
  const response = await fetch(`http://localhost:4000/todos/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  const todo = await response.json();
  return [todo];
};

export const changeTodo = async (params: { id: string; newTodo: newTodo }) => {
  const { id, newTodo } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  const todo = await response.json();
  return todo;
};
