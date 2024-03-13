"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function TodoCSRPage() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos`);
      const todos = response.json();
      return todos;
    },
  });
  return <div>TodoCSRPage</div>;
}

export default TodoCSRPage;
