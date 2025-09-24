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
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

const TODOS_PER_PAGE = 4;

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoFormData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>();

  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setUserName(decoded.name);
      setLoggedInUserId(decoded.sub);
    }
  }, []);

  // fetching API here
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data: TodoFormData[] = await getUserTodos();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos", err);
      }
    };
    fetchTodos();
  }, []);


  // Create or update todo

  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    try {
      if (editingId !== null) {
        const updated = await updateTodo(editingId, { ...data }); // backend adds userId
        setTodos(todos.map((todo) => (todo.id === editingId ? updated : todo)));
        setEditingId(null);
      } else {
        const newTodo = await createTodo({
          ...data,
          time: new Date().toISOString(),
          completed: false,
        }); // backend adds userId
        setTodos((prev) => [newTodo, ...prev]);
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
  const userTodos = todos.filter(todo => String(todo.userId) === String(loggedInUserId));
  const totalPages = Math.ceil(userTodos.length / TODOS_PER_PAGE);
  const startIndex = (currentPage - 1) * TODOS_PER_PAGE;
  const currentTodos = userTodos.slice(startIndex, startIndex + TODOS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // if (loading) return <p>Loading todos...</p>;

  // handling Logout here

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
      <div className="flex justify-between items-center w-full pb-2">
        <h1 className="capitalize text-2xl">Welcome, {userName} 👋</h1>
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
