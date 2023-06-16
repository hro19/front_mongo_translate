import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

const fetchTask = async (slug: string) => {
  const response = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
  );
  return response.data;
};

const SingleTask = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: task,
    isLoading,
    error,
  } = useQuery(["task", slug], () => fetchTask(slug as string), {
    enabled: !!slug, // もし slug が存在する場合にのみクエリを実行する
  });

  useEffect(() => {
    if (slug) {
      // Prefetch the task data
      fetchTask(slug as string);
    }
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching task: </div>;
    //   {error.message;}
  }

  if (!task) {
    return null; // Handle the case when the task is not available
  }

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task._id}</p>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
};

export default SingleTask;
