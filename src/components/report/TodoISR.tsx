import { Todos } from "@/app/types";

const TodoISR = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });
  const todos: Todos[] = await response.json();
  const doList = todos.filter((todo) => todo.isDone === false);
  const doneList = todos.filter((todo) => todo.isDone === true);
  return (
    <div>
      <p>
        현재까지 {doList.length}개의 할 일 리스트, {doneList.length} 개의 완료
        리스트가 존재합니다.
      </p>
    </div>
  );
};

export default TodoISR;
