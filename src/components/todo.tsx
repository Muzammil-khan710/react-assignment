import { useState } from "react";

type Todo = {
  todo: string;
  completed: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      setError("Todo cannot be empty.");
      return;
    }

    setTodos((todos) => [...todos, { todo: inputValue, completed: false }]);
    setInputValue("");
    setError("")
  };

  const handleRemoveTodo = (todoToRemove: string) => {
    setTodos((todos) => todos.filter((item) => item.todo !== todoToRemove));
  };

  const handleDoneTodo = (todoComplete: string) => {
    setTodos((todos) =>
      todos.map((item) =>
        item.todo === todoComplete ? { ...item, completed: true } : item
      )
    );
  };

  return (
    <div className="flex items-center justify-center w-full mt-10 flex-col">
      <div className="bg-sky-200 p-2 rounded-md flex gap-2 max-w-md w-full shadow-md">
        <input
          className="border border-blue-800 rounded-md px-1 py-2 outline-none w-full"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          className="text-white px-4 py-2 bg-blue-800 rounded-md ml-auto"
          onClick={() => handleAddTodo()}
        >
          Add
        </button>
      </div>
      {error && <div className="text-red-600 mt-3">{error}</div>}
      <div className="max-w-md w-full mt-10 flex flex-col gap-2">
        {todos.map(({todo, completed}, index) => (
          <div key={index} className={`flex justify-between items-center gap-2 p-2 rounded-md shadow-md ${completed ? 'bg-sky-200' : 'bg-sky-300'}`}>
            <span className={`${completed ? "line-through" : ""} max-w-60`}>
              {todo}
            </span>
            <div>
              <button disabled={completed} className="text-white bg-blue-800 px-3 py-1 rounded-md disabled:cursor-not-allowed" onClick={() => handleDoneTodo(todo)}>Done</button>
              <button className="text-white bg-blue-800 px-3 py-1 rounded-md ml-2" onClick={() => handleRemoveTodo(todo)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Todo };
