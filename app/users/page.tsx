"use client";

import BaseTable from "@/components/tables/BaseTable";
import { getUserColumns } from "@/components/tables/tablesColumns/users.columns";
import { useState } from "react";


export default function UsersPage() {
const [data, setData] = useState([
  {
    _id: "1",
    userName: "ali123",
    name: "علی",
    email: "ali@gmail.com",
    phone: "09120000000",
    role: "ADMIN",
    isBanned: false,
  },
]);

  const handleEdit = (record: any) => {
    console.log("edit user:", record);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((u) => u._id !== id));
  };
const onToggleBan = (record: any) => {
  setData((prev) =>
    prev.map((user) =>
      user._id === record._id
        ? { ...user, isBanned: !user.isBanned }
        : user
    )
  );
};
const onToggleRole = (record: any) => {
  setData((prev) =>
    prev.map((user) =>
      user._id === record._id
        ? {
            ...user,
            role: user.role === "ADMIN" ? "USER" : "ADMIN",
          }
        : user
    )
  );
};
  return (
    <section className="w-full px-10 flex flex-col">

      <div className="flex justify-end items-end mb-4">

        <h2 className="text-xl font-bold text-right">
          لیست کاربران
        </h2>

      </div>

      <BaseTable
        data={data}
       columns={getUserColumns(handleEdit, handleDelete, onToggleBan, onToggleRole)}
      />

    </section>
  );
}