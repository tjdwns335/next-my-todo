import TodoSSR from "@/components/todo/TodoSSR";
import Link from "next/link";
import React from "react";

function TodoSSRPage() {
  return (
    <>
      <TodoSSR />
      <Link href="/report">할일정보통계보러가기</Link>
    </>
  );
}

export default TodoSSRPage;
