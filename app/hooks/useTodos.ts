import { Todo } from "@prisma/client";
import axios from "axios";
import ms from "ms";
import useSWR from "swr";

const fetcher = (url: string) => {
  return axios.get<Todo[]>(url).then((res) => res.data);
};

const useTodos = () =>
  useSWR<Todo[], Error>("/api/todos", fetcher, {
    refreshInterval: ms("1m"),
  });

export default useTodos;
