"use client";
import Todo, { TodoType } from "../templates/Todo";
import { useEffect, useState } from "react";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  TodoFormData,
  getUserTodos,
} from "@/lib/todo-api";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import axios from "axios";

import { useRouter } from "next/navigation";

const TODOS_PER_PAGE = 4;

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoFormData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>();
  
  const router = useRouter();
  
  
  // fetching API here
  useEffect(() => {
    (async () => {
      try {
        // const data: TodoFormData[] = await getTodo(1);
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const data: TodoFormData[] = await getUserTodos(userId);

        const normalized: TodoFormData[] = data.map((t) => ({
          ...t,
          id: t.id,
          name: t.name,
          description: t.description || "",
          time: t.time ?? new Date().toISOString(),
          completed: t.completed ?? false,
        }));

        setTodos(normalized);
      } catch (err) {
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create or update todo

  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    try {
      if (editingId !== null) {
        const updated = await updateTodo(editingId, { ...data }); // backend adds userId
        setTodos(todos.map((todo) => (todo.id === editingId ? updated : todo)));
        setEditingId(null);
      } else {
        const newTodo = await createTodo({ ...data }); // backend adds userId
        setTodos([newTodo, ...todos]);
      }
      reset();
      setCurrentPage(1);
    } catch (error) {
      console.error("Error saving Todo:", error);
    }
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updated = await updateTodo(id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.log("Error Toggling Todo:", error);
    }
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      const remaining = todos.filter((todo) => todo.id !== id);
      setTodos(remaining);

      if (editingId === id) setEditingId(null);

      // Adjust page if needed
      const lastPage = Math.max(
        1,
        Math.ceil(remaining.length / TODOS_PER_PAGE)
      );
      if (currentPage > lastPage) setCurrentPage(lastPage);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // Edit todo
  const editTodo = (todo: TodoType) => {
    setEditingId(todo.id);
    setValue("name", todo.name);
    setValue("description", todo.description || "");
    setValue("time", todo.time);
    setValue("completed", todo.completed);
  };

  // Pagination logic
  const totalPages = Math.ceil(todos.length / TODOS_PER_PAGE);
  const startIndex = (currentPage - 1) * TODOS_PER_PAGE;
  const currentTodos = todos.slice(startIndex, startIndex + TODOS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p>Loading todos...</p>;


  const handleLogOut = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      // Sending userId in body
      const response = await axios.post(
        "http://localhost:4000/auth/logout",
        { userId: Number(userId) },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("refreshToken");

      console.log("Logged out successfully:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Logout failed:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Logout failed:", error.message);
      } else {
        console.error("Logout failed:", error);
      }
      throw error;
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white grid place-content-center place-items-center">
      <div className="flex justify-end w-full">
        <Button
          type="button"
          label="Logout"
          onClick={async () => {
            try {
              await handleLogOut();
              alert("Logged out successfully");
              router.push("/login");
            } catch {
              alert("Logout failed");
            }
          }}
        ></Button>
      </div>

      <Todo
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errorMessage={errors.name?.message || ""}
        editingId={editingId}
        currentTodos={currentTodos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={handleDelete}
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default TodoPage;
