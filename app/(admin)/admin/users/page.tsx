"use client";

import BaseTable from "@/components/admin/tables/BaseTable";
import { getUserColumns } from "@/components/admin/tables/tablesColumns/users.columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, RoleUser, BanUser } from "@/services/user";
import { toast } from "react-toastify";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
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
    },
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

  const handleDelete = (id: string) => {
    handleDeleteUUser(id);
  };

  const onToggleBan = (record: any) => {
    toggleBan(record.id || record.id);
  };

  const onToggleRole = (record: any) => {
    toggleRole(record.id);
  };

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست کاربران</h2>
      </div>

      <BaseTable
        data={data ?? []}
        columns={getUserColumns(handleDelete, onToggleBan, onToggleRole)}
      />
    </section>
  );
}
