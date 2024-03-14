import TodoSSR from "@/components/todo/TodoSSR";
import Link from "next/link";
import React from "react";
import { TodoPageStyle } from "../style";

function TodoSSRPage() {
  return (
    <div className={TodoPageStyle.wrap}>
      <TodoSSR isActive={false} />
      <TodoSSR isActive={true} />
      <div className={TodoPageStyle.LinkWrap}>
        <Link
          className={TodoPageStyle.LinkAndButton}
          href="/report"
        >
          할일정보통계보러가기
        </Link>
      </div>
    </div>
  );
}

export default TodoSSRPage;
