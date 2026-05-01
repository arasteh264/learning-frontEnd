"use client";

import BaseTable from "@/components/tables/BaseTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, RoleUser, BanUser } from "@/services/user";
import { toast } from "react-toastify";
import { getTeacherList } from "@/services/teacher";
import { getTeacherColumns } from "@/components/tables/tablesColumns/teacher.columns";

export default function teacherPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher"],
    queryFn: getTeacherList,
  });
  const { mutate: handleDeleteUUser } = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("کاربر با موفقیت حذف شد.");
    },
    onError: (err) => {
      toast.error("خطا در حذف کاربر.");
    },
  });

const { mutate: toggleBan } = useMutation({
  mutationFn: BanUser,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("وضعیت کاربر با موفقیت تغییر کرد.");
  },
  onError: (err) => {
    toast.error("خطا در تغییر وضعیت کاربر.");
  }
});
const { mutate: toggleRole } = useMutation({
  mutationFn: RoleUser,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("نقش کاربر تغییر کرد");
  },

  onError: () => {
    toast.error("خطا در تغییر نقش");
  },
});
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error loading users</p>;


  const handleDelete = (id: string) => {
    handleDeleteUUser(id);
  };

  const onToggleBan = (record: any) => {
    toggleBan(record._id || record.id);
  };

 const onToggleRole = (record: any) => {
  toggleRole(record._id);
};

  return (
    <section className="w-full px-10 flex flex-col">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست اساتید</h2>
      </div>

      <BaseTable
        data={data?.data ?? []}
        columns={getTeacherColumns(
          handleDelete,
          onToggleBan,
        )}
      />
    </section>
  );
}
