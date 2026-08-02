"use client";

import { useState, useMemo } from "react";
import { Button, Select } from "antd";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import {
  ArticleStatus,
  getAllArticles,
  removeArticle,
} from "@/src/services/article/article";
import { getArticleColumns } from "@/src/components/admin/tables/tablesColumns/articles.columns";
import { ApiError } from "@/src/types/globalType";

export default function ArticlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ArticleStatus | undefined>(undefined);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["articles", status],
    queryFn: () => getAllArticles(status),
  });

  const { mutate: removeMutation } = useMutation({
    mutationFn: (id: string) => removeArticle(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("مقاله مورد نظر با موفقیت حذف شد.");
    },

    onError: (err: ApiError) => {
      toast.error(err.response?.data?.message || "خطا رخ داد");
    },
  });

  const handleDelete = (id: string) => {
    removeMutation(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/article/edit/${id}`);
  };

  const columns = useMemo(
    () => getArticleColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-between items-center mb-4">
        <Button
          type="primary"
          size="large"
          onClick={() => router.push("/admin/article/create")}
        >
          افزودن مقاله
        </Button>

        <div className="flex items-center gap-3">
          <Select
            value={status}
            onChange={setStatus}
            style={{ width: 180 }}
            allowClear
            placeholder="همه وضعیت‌ها"
            options={[
              { label: "منتشر شده", value: "published" },
              { label: "پیش نویس", value: "draft" },
            ]}
          />

          <h2 className="text-xl font-bold">لیست مقالات</h2>
        </div>
      </div>

      <BaseTable
        data={data || []}
        columns={columns}
        loading={isLoading || isFetching}
      />
    </section>
  );
}
