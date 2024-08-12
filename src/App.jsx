import { useState, useEffect } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./components/Todo";


function App() {
  const queryclient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <Todo />
      </QueryClientProvider>
    </div>
  );
}

export default App;
