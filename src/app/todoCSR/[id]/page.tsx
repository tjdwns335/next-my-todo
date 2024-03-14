"use client";
import {
  changeTodo,
  deleteTodoMutationFunction,
  getTodoById,
} from "@/app/queryFunction";
import { detailStyle, todoListStyle } from "@/app/style";
import { TodoData, Todos, newTodo, params } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DetailPage({ params }: { params: params }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { id } = params;
  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery<Todos[], Error>({
    queryKey: ["todos"],
    queryFn: () => getTodoById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoMutationFunction,
  });
  const changeTodoMutation = useMutation({
    mutationFn: changeTodo,
  });

  const onClickDeleteTodoHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          router.push("/todoCSR");
        },
      });
    }
  };

  const onClickChange = (id: string) => {
    setChange((prev) => !prev);
    const newTodoData: newTodo = {
      title,
      contents,
    };
    changeTodoMutation.mutate(
      { id, newTodo: newTodoData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          setTitle("");
          setContents("");
        },
      }
    );
  };

  if (isLoading) return <div>로딩중....</div>;
  if (isError) return <div>Error fetching data</div>;

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
