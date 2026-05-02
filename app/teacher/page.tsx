"use client";

import BaseTable from "@/components/tables/BaseTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, RoleUser, BanUser } from "@/services/user";
import { toast } from "react-toastify";
import { getTeacherList, verifyTeacher } from "@/services/teacher";
import { getTeacherColumns } from "@/components/tables/tablesColumns/teacher.columns";
import { useMemo } from "react";

export default function teacherPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher"],
    queryFn: getTeacherList,
  });

  const { mutate: handleDeleteUUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("کاربر حذف شد");
    },
  });

  const { mutate: toggleBan } = useMutation({
    mutationFn: BanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
  });

  const { mutate: toggleRole } = useMutation({
    mutationFn: RoleUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
  });

  const { mutate: verifyTeacherMutate } = useMutation({
    mutationFn: verifyTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("استاد تایید شد");
    },
  });

  // handlers
  const handleDelete = (id: string) => handleDeleteUUser(id);
  const onToggleBan = (record: any) => toggleBan(record._id);
  const onToggleRole = (record: any) => toggleRole(record._id);
  const handleVerify = (id: string) => verifyTeacherMutate(id);

  // ✅ اینجا باید باشه (قبل از return)
  const columns = useMemo(
    () =>
      getTeacherColumns(
        handleDelete,
        onToggleBan,
        handleVerify
      ),
    [handleDelete, onToggleBan, handleVerify]
  );

  // ✅ حالا condition
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error loading users</p>;

  return (
    <section className="w-full px-10 flex flex-col">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست اساتید</h2>
      </div>

      <BaseTable
        data={data?.data ?? []}
        columns={columns}
      />
    </section>
  );
}