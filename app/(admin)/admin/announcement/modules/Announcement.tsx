"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getannouncementColumns } from "@/src/components/admin/tables/tablesColumns/announcement.columns";
import { Button, Modal, Input } from "antd";
import { useEffect, useMemo, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  create,
  getAll,
  getById,
  onChangeStatus,
  remove,
  update,
} from "@/src/services/announcement";
import TextArea from "antd/lib/input/TextArea";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

type AnnouncementForm = {
  text: string;
  end_date: string;
};

export default function AnnouncementPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching  } = useQuery({
    queryKey: ["announcement"],
    queryFn: getAll,
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const isEdit = !!editing?.id;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    defaultValues: { text: "", end_date: "" },
  });

  const modalKey = useMemo(
    () => (isEdit ? `edit-${editing?.id}` : "add"),
    [isEdit, editing?.id],
  );

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت اضافه شد");
      setOpen(false);
      reset({ text: "", end_date: "" });
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در ایجاد");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AnnouncementForm }) =>
      update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت ویرایش شد");
      setOpen(false);
      setEditing(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در ویرایش");
    },
  });

  const { data: detailData } = useQuery({
    queryKey: ["announcement", editingId],
    queryFn: () => getById(editingId!),
    enabled: !!editingId,
  });

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت حذف شد");
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در حذف");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => onChangeStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("وضعیت تغییر کرد");
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در تغییر وضعیت");
    },
  });

  const handleAdd = () => {
    setEditing(null);
    reset({ text: "", end_date: "" });
    setOpen(true);
  };

const handleEdit = async (record: any) => {
  setEditing(record);
  try {
    const detail = await getById(record.id);
    reset({
      text: detail?.text || "",
      end_date: detail?.end_date || "",
    });
    setOpen(true);
  } catch {
    toast.error("خطا در دریافت اطلاعات");
  }
};

  const handleDelete = (record: any) => {
    deleteMutation.mutate(record.id);
  };
  const onToggleStatus = (record: any) => {
    toggleMutation.mutate(record.id);
  };
  const onSubmit = (formData: AnnouncementForm) => {
    if (isEdit) {
      updateMutation.mutate({
        id: editing.id,
        data: formData,
      });
    } else {
      const addData = {
        text: formData.text,
        end_date: formData.end_date,
        is_active: false,
      };
      createMutation.mutate(addData);
    }
  };


const cansleModal=()=>{
setOpen(false)
  setEditingId(null); 
  setEditing(null);
}
console.log("isLoading:", isLoading, "data:", data);
  return (
    <section className="w-full px-10 flex flex-col mt-6">
      <Button type="primary" className="mb-4 self-end" onClick={handleAdd}>
        افزودن اعلان
      </Button>

      <BaseTable
        data={data}
         loading={isLoading || isFetching}
        columns={getannouncementColumns(
          handleEdit,
          handleDelete,
          onToggleStatus,
        )}
      />

      <Modal
        key={modalKey}
        open={open}
        onCancel={cansleModal}
        onOk={handleSubmit(onSubmit)}
        okText="ذخیره"
        cancelText="بستن"
        title={isEdit ? "ویرایش اعلان" : "افزودن اعلان"}
        width={520}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label>متن اعلان:</label>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <TextArea {...field} placeholder="مثلاً: اخبار تکنولوژی" />
              )}
            />
            {errors.text && (
              <p className="text-red-500 text-xs">{errors.text.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              تاریخ پایان:
            </label>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                تاریخ پایان:
              </label>

              <div className="relative rounded-xl border border-gray-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-400 focus-within:border-blue-500 focus-within:shadow-md">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  📅
                </div>

                <Controller
                  name="end_date"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full pr-6">
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={field.value ? new Date(field.value) : null} 
                        onChange={(date) =>
                          field.onChange(date?.toDate?.().toISOString())
                        }
                        inputClass="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        containerClassName="w-full"
                        format="YYYY/MM/DD HH:mm"
                        plugins={[<TimePicker position="bottom" />]}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.end_date && (
                <p className="text-red-500 text-xs">
                  {errors.end_date.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
