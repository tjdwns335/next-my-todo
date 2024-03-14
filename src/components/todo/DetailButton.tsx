"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function DetailButton({ todoId }: { todoId: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/todoCSR/${todoId}`);
      }}
    >
      상세보기
    </button>
  );
}

export default DetailButton;
