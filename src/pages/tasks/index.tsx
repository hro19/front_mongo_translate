import React from "react";
import { Inter } from "next/font/google";
import TasksSection from "../../components/TasksSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <TasksSection />
    </main>
  );
}
