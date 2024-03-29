export async function GET(request: Request) {
  const response = await fetch(`http://localhost:4000/todos`);
  const todos = await response.json();

  if (!todos) {
    return new Response("Todo is not found", {
      status: 404,
    });
  }

  return Response.json({
    todos: [...todos],
  });
}

export async function POST(request: Request) {
  const { title, contents }: { title: string; contents: string } =
    await request.json();
  if (!title || !contents) {
    return new Response("제목과 내용을 입력해주세요", { status: 400 });
  }

  const response = await fetch(`http://localhost:4000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title, contents, isDone: false }),
  });

  const newTodo = await response.json();

  return new Response(JSON.stringify(newTodo), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
export async function PATCH(request: Request) {
  const { id, isDone }: { id: string; isDone: boolean } = await request.json();
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: !isDone }),
  });
  const switchTodo = await response.json();

  return Response.json({
    todo: switchTodo,
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return new Response("Todo deleted successfully", { status: 200 });
  } else {
    return new Response("Failed to delete todo", { status: 500 });
  }
}
