"use client";
import { useAddTodoMutation } from "@/app/querys";
import { formStyle } from "@/app/style";
import React from "react";

function TodoForm() {
  const { title, setTitle, contents, setContents, newTodoMutation } =
    useAddTodoMutation();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !contents) {
      alert("제목과 내용을 입력해주세요");
      return;
    }
    newTodoMutation.mutate({ title, contents, isDone: false });
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
          maxLength={8}
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
          maxLength={12}
          placeholder="내용을 입력해주세요"
          className={formStyle.inputStyle}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <button className={formStyle.addButton}>추가하기</button>
    </form>
  );
}

export default TodoForm;
