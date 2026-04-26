"use client";

import BaseTable from "@/components/tables/BaseTable";
import { getSessionColumns } from "@/components/tables/tablesColumns/sessions.columns";
import { Button } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SessionsPage() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "مقدمه React",
      time: "12:30",
      free: 0,
      video: "https://example.com/video",
      course: { title: "React Next" },
    },
  ]);
  const router = useRouter();
  const handleEdit = (record: any) => {
    console.log("edit:", record);
  };

  const handleDelete = (id: any) => {
    setData((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <section className="w-full px-10 flex flex-col">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold">
          لیست جلسات
        </h2>

        <Button type="primary" onClick={() => router.push("/sessions/create")}>
          افزودن جلسه
        </Button>

      </div>

      <BaseTable
        data={data}
        columns={getSessionColumns(handleEdit, handleDelete)}
      />

    </section>
  );
}