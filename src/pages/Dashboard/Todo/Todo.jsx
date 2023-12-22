import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Todo = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tasks = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      console.log(res.data);
      return res.data;
    },
  });
  return <div>ToDo</div>;
};

export default Todo;
