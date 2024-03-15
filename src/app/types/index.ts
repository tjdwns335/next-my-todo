export type Todos = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};
export type TodoData = Omit<Todos, "id">;

export type newTodo = Omit<Todos, "id" | "isDone">;

export type companyInfo = {
  name: string;
  description: string;
  image: string;
};

export type TodoProps = {
  isActive: boolean;
};

export type params = Pick<Todos, "id">;
