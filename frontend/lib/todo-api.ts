// import { headers } from "next/headers";
import { api } from "./api";

export interface TodoFormData {
  id: number;
  userId?: string;
  name: string;
  description: string;
  time: string;
  completed: boolean;
  
}
// Authenticating USer 

const authHeader = ()=>({
  headers: {
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
})

// here i am creating todo
export const createTodo = async (todo: Omit<TodoFormData, "id">): Promise<TodoFormData> => {
  const res = await api.post("/todos", todo, authHeader());
  return res.data;
};

// here i am creating todo for a specific user

export const getUserTodos = async (userId: string): Promise<TodoFormData[]> => {
  const res = await api.get(`/todos?userId=${userId}`);
  return res.data;
};
// Here i am getting all the Todos from db

export const getAllTodos = async (): Promise<TodoFormData[]> => {
  const res = await api.get("/todos", authHeader());
  return res.data;
};


// here i am getting single todo
export async function getTodo(id: number): Promise<TodoFormData[]> {
  const res = await fetch(`/todos/${id}`, authHeader()); // replace with your API endpoint
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}



// here i am updating todo

export const updateTodo = async (
  id: number,
  todo: Partial<TodoFormData>
): Promise<TodoFormData> => {
  const res = await api.put(`/todos/${id}`, todo, authHeader());
  return res.data;
};

// here i am deleting the todos by id

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`, authHeader());
};
