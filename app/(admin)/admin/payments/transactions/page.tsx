"use client";

import { useQuery } from "@tanstack/react-query";
import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getTransactionColumns } from "@/src/components/admin/tables/tablesColumns/transaction.columns";
import { getAllTransactions } from "@/src/services/payment";

export default function TransactionsPage() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  const columns = getTransactionColumns();

  return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست تراکنش‌ها</h2>
      </div>

      <BaseTable
        data={data || []}
        columns={columns}
        loading={isLoading || isFetching}
      />
    </section>
  );
}