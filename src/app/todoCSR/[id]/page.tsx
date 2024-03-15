"use client";
import {
  changeTodoById,
  useDeleteTodoMutationById,
  useTodosQueryById,
} from "@/app/querys";
import { detailStyle, todoListStyle } from "@/app/style";
import Error from "@/components/todo/Error";
import Loading from "@/components/todo/Loading";
import React, { useState } from "react";

import type { newTodo, params } from "@/app/types";

function DetailPage({ params }: { params: params }) {
  const { deleteMutation } = useDeleteTodoMutationById();
  const { title, setTitle, contents, setContents, changeTodoMutation } =
    changeTodoById();
  const [change, setChange] = useState(false);

  const { id } = params;

  const { todo, isLoading, isError } = useTodosQueryById(id);

  const onClickDeleteTodoHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteMutation.mutate(id);
    }
  };

  const onClickChange = (id: string) => {
    setChange((prev) => !prev);
    if (!title || !contents) {
      return;
    }
    const newTodoData: newTodo = {
      title,
      contents,
    };
    changeTodoMutation.mutate({ id, newTodo: newTodoData });
  };

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError)
    return (
      <>
        <Error />
      </>
    );

  return (
    <div>
      {todo?.map((item) => {
        return (
          <div
            className={detailStyle.wrap}
            key={item.id}
          >
            <div className={detailStyle.contentWrap}>
              <h2 className={detailStyle.title}>ID</h2>
              <span className={detailStyle.text}>{item.id}</span>
            </div>
            <div className={detailStyle.contentWrap}>
              <h2 className={detailStyle.title}>TITLE</h2>
              {change ? (
                <input
                  type="text"
                  value={title || item.title}
                  maxLength={8}
                  className={detailStyle.text}
                  placeholder="제목을 수정해주세요"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              ) : (
                <span className={detailStyle.text}>{item.title}</span>
              )}
            </div>
            <div className={detailStyle.contentWrap}>
              <h2 className={detailStyle.title}>CONTENTS</h2>
              {change ? (
                <input
                  type="text"
                  value={contents || item.contents}
                  maxLength={12}
                  className={detailStyle.text}
                  placeholder="내용을 수정해주세요"
                  onChange={(e) => {
                    setContents(e.target.value);
                  }}
                />
              ) : (
                <span className={detailStyle.text}>{item.contents}</span>
              )}
            </div>
            <div className={detailStyle.contentWrap}>
              <h2 className={detailStyle.title}>STATE</h2>
              <span className={detailStyle.text}>
                {item.isDone ? "다 한 일☑️" : "해야 할 일🔥"}
              </span>
            </div>
            <div className="mt-5">
              <button
                className={
                  item.isDone
                    ? todoListStyle.cancelButton
                    : todoListStyle.doneButton
                }
                onClick={() => onClickChange(item.id)}
              >
                {change ? "수정완료" : "수정하기"}
              </button>
              <button
                className={todoListStyle.deleteButton}
                onClick={() => onClickDeleteTodoHandler(item.id)}
              >
                삭제하기
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DetailPage;
