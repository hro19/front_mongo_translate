import React from "react";
import { Inter } from "next/font/google";
import TasksSection from "../../components/TasksSection";
import Popups from "../../components/Modalpop";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Popups />
      <TasksSection />
    </main>
  );
}
