"use client";
import React from "react";
import TodoList from "@/components/todo/TodoList";
import TodoForm from "@/components/todo/TodoForm";
import { useRouter } from "next/navigation";
import { TodoPageStyle } from "../style";

function TodoCSRPage() {
  const router = useRouter();
  return (
    <div className={TodoPageStyle.wrap}>
      <TodoForm />
      <TodoList isActive={false} />
      <TodoList isActive={true} />
      <div className={TodoPageStyle.LinkWrap}>
        <button
          className={TodoPageStyle.LinkAndButton}
          onClick={() => {
            router.push("/report");
          }}
        >
          할 일 정보통계 보러가기
        </button>
      </div>
    </div>
  );
}

export default TodoCSRPage;
