import { reportStyle } from "@/app/style";

import type { Todos } from "@/app/types";

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
    <div className={reportStyle.wrapStyle}>
      <h1 className={reportStyle.titleStyle}>⭐Todo-List 현재 현황⭐</h1>
      <p className={reportStyle.textStyle}>
        현재까지 <span className={reportStyle.spanStyle}>{doList.length}</span>
        &nbsp;개의 할 일 리스트, &nbsp;
        <span className={reportStyle.spanStyle}>{doneList.length}</span> 개의
        완료 리스트가 존재합니다.
      </p>
    </div>
  );
};

export default TodoISR;
