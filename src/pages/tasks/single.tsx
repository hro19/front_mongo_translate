import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import SlugForm from "@/components/taskShingle/SlugForm";

const fetchTask = async (slug: string) => {
  const response = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
  );
  return response.data;
};

const SingleTask = () => {
  const router = useRouter();
  const { query } = router;
  const slug = query._id; // クエリパラメータ "_id" の値を取得

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
      <h1>【ID】{task._id}</h1>
      <p>【英単語】{task.name}</p>
      <p>【日本語訳】{task.jaName}</p>
      <p>【進捗】{task.completed ? "暗記済み" : "勉強中"}</p>
      <SlugForm task={task} />
      <p className="text-2xl mt-2 text-orange-700">
        <Link href="/tasks">単語一覧へ戻る</Link>
      </p>
    </div>
  );
};

export default SingleTask;
