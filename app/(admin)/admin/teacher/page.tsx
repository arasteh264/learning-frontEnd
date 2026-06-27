"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCallback, useMemo } from "react";
import { getTeacherList, removeTeacher, verifyTeacher, Teacher } from "@/src/services/teacher";
import { getTeacherColumns } from "@/src/components/admin/tables/tablesColumns/teacher.columns";
import { ApiError } from "@/src/types/globalType";


export default function TeacherPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery<Teacher[]>({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
  });

  const { mutate: verifyTeacherMutate } = useMutation({
    mutationFn: verifyTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("استاد تایید شد");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در تایید استاد");
    },
  });

  const { mutate: removeMutation } = useMutation({
    mutationFn: (id: string) => removeTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("استاد با موفقیت حذف شد");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا رخ داد");
    },
  });


  const handleDelete = useCallback((id: string) => {
    removeMutation(id);
  }, [removeMutation]);

  const handleVerify = useCallback((id: string) => {
    verifyTeacherMutate(id);
  }, [verifyTeacherMutate]);

  const columns = useMemo(
    () => getTeacherColumns(handleDelete, handleVerify),
    [handleDelete, handleVerify]
  );

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست اساتید</h2>
      </div>

      <BaseTable
        data={data ?? []}
        columns={columns}
        loading={isLoading || isFetching}
      />
    </section>
  );
}