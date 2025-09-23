import { api } from "./api";

export interface TodoFormData {
  id: number;
  name: string;
  description: string;
  time: string;
  completed: boolean;
}

// here i am creating todo
export const createTodo = async (todo: Omit<TodoFormData, "id">): Promise<TodoFormData> => {
  const res = await api.post("/todos", todo);
  return res.data;
};

// Here i am getting all the Todos from db

export const getAllTodos = async (): Promise<TodoFormData[]> => {
  const res = await api.get("/todos");
  return res.data;
};


// here i am getting single todo
// export const getTodo = async (id: number): Promise<TodoFormData[]> => {
//   const res = await api.get(`/todos/${id}`);
//   return res.data;
// };
export async function getTodo(id: number): Promise<TodoFormData[]> {
  const res = await fetch(`/todos/${id}`); // replace with your API endpoint
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}



// here i am updating todo

export const updateTodo = async (
  id: number,
  todo: Partial<TodoFormData>
): Promise<TodoFormData> => {
  const res = await api.put(`/todos/${id}`, todo);
  return res.data;
};

// here i am deleting the todos by id

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
