"use client";
import Todo, { TodoType } from "../templates/Todo";
import { useEffect, useState } from "react";
import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  TodoFormData,
} from "@/lib/todo-api";
import { useForm, SubmitHandler } from "react-hook-form";

const TODOS_PER_PAGE = 5;

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoFormData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>();
  // fetching API here

  useEffect(() => {
    (async () => {
      try {
        const data: TodoFormData[] = await getTodo(1);

        const normalized: TodoFormData[] = data.map((t) => ({
          id: t.id,
          name: t.name,
          description: t.description || "",
          time: t.time ?? new Date().toISOString(),
          completed: t.completed ?? false,
        }));

        setTodos(normalized);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    })();
  }, []);


  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    if (editingId !== null) {
      try {
        const updated = await updateTodo(editingId, data);
        setTodos(todos.map((todo) => (todo.id === editingId ? updated : todo)));
        setEditingId(null);
      } catch (error) {
        console.log("Error fetching Todo:", error);
      }
    } else {
      try {
        const newTodo = await createTodo(data as Omit<TodoFormData, "id">);
        setTodos([newTodo, ...todos]);
      } catch (error) {
        console.log("Error Creating Todo:", error);
      }
    }
    reset();
    setCurrentPage(1);
    console.log("Todo Data:", data)
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

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      if (editingId === id) setEditingId(null);

      const lastPage = Math.ceil((todos.length - 1) / TODOS_PER_PAGE);
      if (currentPage > lastPage) setCurrentPage(lastPage);
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

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

  return (
    <div className="w-full h-[100vh] bg-white grid place-content-center place-items-center">
      <Todo
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        todos={todos}
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
