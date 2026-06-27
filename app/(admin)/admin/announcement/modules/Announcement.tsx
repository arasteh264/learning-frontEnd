"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getannouncementColumns } from "@/src/components/admin/tables/tablesColumns/announcement.columns";
import { Button, Modal } from "antd";
import { Controller } from "react-hook-form";
import TextArea from "antd/lib/input/TextArea";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useAnnouncement } from "./Useannouncement";


export default function AnnouncementPage() {
  const {
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
  } = useAnnouncement();

  return (
    <section className="w-full px-10 flex flex-col mt-6">
      <Button type="primary" className="mb-4 self-end" onClick={handleAdd}>
        افزودن اعلان
      </Button>

      <BaseTable
        data={data || []}
        loading={isLoading || isFetching}
        columns={getannouncementColumns(handleEdit, handleDelete, onToggleStatus)}
      />

      <Modal
        key={modalKey}
        open={open}
        onCancel={cancelModal}
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
              name="content"
              control={control}
              render={({ field }) => (
                <TextArea {...field} placeholder="مثلاً: اخبار تکنولوژی" />
              )}
            />
            {errors.content && (
              <p className="text-red-500 text-xs">{errors.content.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">تاریخ پایان:</label>

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
                      plugins={[<TimePicker position="bottom" key="time" />]}
                    />
                  </div>
                )}
              />
            </div>

            {errors.end_date && (
              <p className="text-red-500 text-xs">{errors.end_date.message}</p>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}