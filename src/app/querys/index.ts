import { useQuery } from "@tanstack/react-query";
import { Todos, companyInfo } from "../types";
import { getCompanyInfo, getTodoById, getTodoList } from "../queryFunction";

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
