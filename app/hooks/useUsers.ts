import { User } from "@prisma/client";
import axios from "axios";
import ms from "ms";
import useSWR from "swr";

const fetcher = (url: string) => {
  return axios.get<User[]>(url).then((res) => res.data);
};

const useUsers = () =>
  useSWR<User[], Error>("/api/users", fetcher, {
    refreshInterval: ms("10s"),
  });

export default useUsers;
