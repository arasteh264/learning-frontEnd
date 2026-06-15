"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, RoleUser, BanUser } from "@/src/services/user";
import { toast } from "react-toastify";
import {
  getTeacherList,
  removeTeacher,
  verifyTeacher,
} from "@/src/services/teacher";
import { getTeacherColumns } from "@/src/components/admin/tables/tablesColumns/teacher.columns";
import { useMemo } from "react";

export default function teacherPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error,isFetching } = useQuery({
    queryKey: ["teacher"],
    queryFn: getTeacherList,
  });

  const { mutate: verifyTeacherMutate } = useMutation({
    mutationFn: verifyTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("استاد تایید شد");
    },
  });

  const { mutate: removeMutation } = useMutation({
    mutationFn: (id: string) => removeTeacher(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success("استاد مورد نظر با موفقیت حذف شد.");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message || "خطا رخ داد");
    },
  });

  const handleDelete = (id: string) => {
    removeMutation(id);
  };

  const handleVerify = (id: string) => verifyTeacherMutate(id);

  const columns = useMemo(
    () => getTeacherColumns(handleDelete, handleVerify),
    [handleDelete, handleVerify],
  );

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست اساتید</h2>
      </div>

      <BaseTable data={data} columns={columns} loading={isLoading||isFetching} />
    </section>
  );
}
