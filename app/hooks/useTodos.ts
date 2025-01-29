import { Todo } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => {
  return axios.get<Todo[]>(url).then((res) => res.data);
};

const useTodos = () => useSWR<Todo[], Error>("/api/todos", fetcher);

export default useTodos;
