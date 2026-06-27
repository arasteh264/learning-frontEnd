import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  create,
  getAll,
  getById,
  onChangeStatus,
  remove,
  update,
  Announcement,
  UpdateAnnouncementPayload,
} from "@/src/services/announcement";


export type AnnouncementForm = {
    title?: string;
  content: string;
  end_date: string;
};


export const useAnnouncement = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const isEdit = !!editing?.id;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    defaultValues: { content: "", end_date: "" },
  });

  const modalKey = useMemo(
    () => (isEdit ? `edit-${editing?.id}` : "add"),
    [isEdit, editing?.id]
  );

  const { data, isLoading, isFetching } = useQuery<Announcement[]>({
    queryKey: ["announcement"],
    queryFn: getAll,
  });

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت اضافه شد");
      setOpen(false);
      reset({ content: "", end_date: "" });
    },
    onError: (err: Error) => {
      toast.error(err?.message || "خطا در ایجاد");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnnouncementPayload }) =>
      update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت ویرایش شد");
      setOpen(false);
      setEditing(null);
    },
    onError: (err: Error) => {
      toast.error(err?.message || "خطا در ویرایش");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت حذف شد");
    },
    onError: (err: Error) => {
      toast.error(err?.message || "خطا در حذف");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => onChangeStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("وضعیت تغییر کرد");
    },
    onError: (err: Error) => {
      toast.error(err?.message || "خطا در تغییر وضعیت");
    },
  });

  const handleAdd = () => {
    setEditing(null);
    reset({ content: "", end_date: "" });
    setOpen(true);
  };

  const handleEdit = async (record: Announcement) => {
    setEditing(record);
    try {
      const detail = await getById(record.id);
      reset({
        content: detail?.content || "",
        end_date: detail?.updated_at || "",
      });
      setOpen(true);
    } catch {
      toast.error("خطا در دریافت اطلاعات");
    }
  };

  const handleDelete = (record: Announcement) => {
    deleteMutation.mutate(record.id);
  };

  const onToggleStatus = (record: Announcement) => {
    toggleMutation.mutate(record.id);
  };

  const onSubmit = (formData: AnnouncementForm) => {
    if (isEdit && editing) {
      updateMutation.mutate({ id: editing.id, data: formData });
    } else {
      createMutation.mutate({ content: formData.content });
    }
  };

  const cancelModal = () => {
    setOpen(false);
    setEditing(null);
  };

  return {
    data,
    isLoading,
    isFetching,
    open,
    modalKey,
    isEdit,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleAdd,
    handleEdit,
    handleDelete,
    onToggleStatus,
    cancelModal,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};