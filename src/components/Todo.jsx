import React, { useState, useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Todo = () => {
    
  //   const [todos, setTodos] = useState([]);
  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/todos")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTodos(data);
  //         console.log(todos);
  //       });
  //   }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newTodo) => 
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { "content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json()),

    onSuccess: (data, variable,content) => {
      // onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], (oldTodo) => {
          [...oldTodo, newTodo];
        });
    //   console.log(data);
      console.log(variable);
      // console.log(context);
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) {
    return "Loading....";
  }

  if (error || isError) {
    // console.log(error);
  }

  return (
    <div>
      {isPending && <p>Data is being added</p>}
      <button
        onClick={() =>
          mutate({
            userId: 5000,
            id: 2000,
            title: "This is my Todo",
            // "completed": false
            body: "This is the body of the post",
          })
        }
      >
        Add
      </button>
      {data.map((todo) => (
        <div key={todo.id}>
          <h5>{todo.title}</h5>
          <h6>
            {todo.completed && <span>Completed</span>}
            {!todo.completed && <span>Pending</span>}
          </h6>
        </div>
      ))}
    </div>
  );
};

export default Todo;
