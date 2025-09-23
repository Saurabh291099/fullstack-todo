"use client";
import Input from "../components/Input";
import Button from "../components/Button";
import { UseFormRegister } from "react-hook-form";
export interface TodoType {
  id: number;
  name: string;
  description?: string;
  time: string;
  completed: boolean;
}

interface TodoFormData {
  id: number;
  name: string;
  description: string;
  time: string;
  completed: boolean;
}

interface TodoItem {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<TodoFormData>;
  todos: TodoFormData[];
  errorMessage?: string;
  editingId: number | null;
  currentTodos: TodoFormData[];
  toggleComplete: (id: number) => void;
  editTodo: (todo: TodoFormData) => void;
  deleteTodo: (id: number) => void;
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const Todo: React.FC<TodoItem> = ({
  handleSubmit,
  todos,
  register,
  errorMessage,
  editingId,
  currentTodos,
  toggleComplete,
  editTodo,
  deleteTodo,
  totalPages,
  currentPage,
  goToPage,
}) => {
  return (
    <div className="border bg-gray-100 flex flex-col items-center p-10 rounded-xl">
      <div
        className={`${
          todos.length === 1 ? "flex justify-between items-center" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        {todos.length === 1 ? (
          <Button type="button" label="Add New Todo" />
        ) : (
          ""
        )}
      </div>

      {/* Todo Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-2 max-w-md mb-4"
      >
        <Input
          id="name"
          label="Name"
          type="text"
          {...register("name", { required: "Name is required" })}
          errorMessage={errorMessage}
          // errorMessage={errors.name?.message}
          className="w-full"
        />

        <Input
          id="description"
          label="Description"
          type="text"
          {...register("description")}
          className="w-full"
        />

        <Input
          id="time"
          label="Time"
          type="datetime-local"
          {...register("time", { required: "Time is required" })}
          errorMessage={errorMessage}
          className="w-full"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("completed")} />
          <span>Completed?</span>
        </label>

        <Button
          type="submit"
          label={editingId !== null ? "Update" : "Add"}
          className="h-11"
        />
      </form>

      {/* Todo List */}
      <ul className="w-full max-w-md">
        {currentTodos.length === 0 && (
          <li className="text-gray-500 text-center py-4">No todos yet</li>
        )}
        {currentTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col bg-white px-4 py-2 mb-2 rounded shadow"
          >
            <div
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              <p className="font-bold">{todo.name}</p>
              <p className="text-sm">{todo.description}</p>
              <p className="text-xs text-gray-500">{todo.time}</p>
              <p className="text-xs text-gray-500">
                {todo.completed ? "Completed" : "In Progress"}
              </p>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editTodo(todo)}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            label="Prev"
            className="px-3 py-1"
            onClick={() => goToPage(currentPage - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <Button
            type="button"
            label="Next"
            className="px-3 py-1"
            onClick={() => goToPage(currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
