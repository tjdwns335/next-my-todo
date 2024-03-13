"use client";
import React from "react";
import TodoList from "@/components/todo/TodoList";
import TodoForm from "@/components/todo/TodoForm";
import { useRouter } from "next/navigation";

function TodoCSRPage() {
  const router = useRouter();
  return (
    <div className="w-4/5 m-auto">
      <TodoForm />
      <TodoList isActive={false} />
      <TodoList isActive={true} />
      <button
        onClick={() => {
          router.push("/report");
        }}
      >
        할일정보통계보러가기
      </button>
    </div>
  );
}

export default TodoCSRPage;
