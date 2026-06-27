"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getUserColumns } from "@/src/components/admin/tables/tablesColumns/users.columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, banUser, updateUserRole, User, UpdateRolePayload } from "@/src/services/user";
import { toast } from "react-toastify";
import { ApiError } from "@/src/types/globalType";




export default function UsersPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("کاربر با موفقیت حذف شد");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در حذف کاربر");
    },
  });

  const { mutate: toggleBan } = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("وضعیت کاربر با موفقیت تغییر کرد");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در تغییر وضعیت");
    },
  });

  const { mutate: toggleRole } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRolePayload }) =>
      updateUserRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("نقش کاربر تغییر کرد");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در تغییر نقش");
    },
  });

  const handleDelete = (id: string) => handleDeleteUser(id);

  const onToggleBan = (record: User) => {
    toggleBan(record.id);
  };

  const onToggleRole = (record: User) => {
    const nextRole = record.role === "USER" ? "TEACHER" : "USER";
    toggleRole({ id: record.id, payload: { role: nextRole } });
  };

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست کاربران</h2>
      </div>

      <BaseTable
        data={data ?? []}
        loading={isLoading || isFetching}
        columns={getUserColumns(handleDelete, onToggleBan, onToggleRole)}
      />
    </section>
  );
}