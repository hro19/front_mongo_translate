import React from "react";
import { Inter } from "next/font/google";
import TasksSection from "../../components/TasksSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold my-5 text-center">トランスレート</h1>

    </main>
  );
}
