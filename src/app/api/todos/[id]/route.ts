import { Todos, params } from "@/app/types";

export async function GET(request: Request, { params }: { params: params }) {
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`);
  const todo: Todos[] = await response.json();
  return new Response(JSON.stringify(todo), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(request: Request, { params }: { params: params }) {
  const { title, contents } = await request.json();
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents }),
  });
  const updatedTodo = await response.json();

  return new Response(JSON.stringify(updatedTodo), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
