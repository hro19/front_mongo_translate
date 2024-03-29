import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { initialSpeechOptionsAtom,getSpeechLabel } from "@/jotai/atoms";
import SlugForm from "@/components/taskShingle/SlugForm";
import { Task } from "@/ts/Task";

const fetchTask = async (slug: string):Promise<Task> => {
  
  const response = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
  );
  return response.data;
};

const SingleTask = () => {
    const [initialSpeechOptions, setInitialSpeechOptions] = useAtom(
    initialSpeechOptionsAtom
  );
  
  const router = useRouter();
  const { query } = router;
  const slug: string = Array.isArray(query._id) ? query._id[0] : query._id ?? "";

  const {
    data: task,
    isLoading,
    error,
  } = useQuery(["task", slug], () => fetchTask(slug as string), {
    enabled: !!slug, // もし slug が存在する場合にのみクエリを実行する
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (slug) {
      // Prefetch the task data
      queryClient.prefetchQuery(["task", slug], () => fetchTask(slug as string));
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
      <p>【品詞】{getSpeechLabel(task.speech as keyof typeof initialSpeechOptions)}</p>
      <p>【進捗】{task.completed ? "暗記済み" : "勉強中"}</p>
      <SlugForm task={task} slug={slug} />
      <p className="text-2xl mt-2 text-orange-700">
        <Link href="/tasks">単語一覧へ戻る</Link>
      </p>
    </div>
  );
};

export default SingleTask;
