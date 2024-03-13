"use client";
import { newTodoMutationFunction } from "@/app/queryFunction";
import { formStyle } from "@/app/style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

function TodoForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const newTodoMutation = useMutation({
    mutationFn: newTodoMutationFunction,
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !contents) {
      alert("제목과 내용을 입력해주세요");
      return;
    }
    newTodoMutation.mutate(
      { title, contents, isDone: false },
      {
        onSuccess: () => {
          setTitle("");
          setContents("");

          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
      }
    );
  };
  return (
    <form
      className={formStyle.formWrapStyle}
      onSubmit={onSubmitHandler}
    >
      <div className={formStyle.inputGroupStyle}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="제목을 입력해주세요"
          className={formStyle.inputStyle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          htmlFor="contents"
          className={formStyle.labelStyle}
        >
          내용
        </label>
        <input
          id="contents"
          type="text"
          value={contents}
          placeholder="내용을 입력해주세요"
          className={formStyle.inputStyle}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <button className="p-4 ml-4 bg-amber-300 text-sky-950">추가하기</button>
    </form>
  );
}

export default TodoForm;
