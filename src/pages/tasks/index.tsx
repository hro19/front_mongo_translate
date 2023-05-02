import React from "react";
import { Inter } from "next/font/google";
import TasksSection from "../../components/TasksSection";
import PopUp from "../../components/PopUp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <PopUp />
      <TasksSection />
    </main>
  );
}
