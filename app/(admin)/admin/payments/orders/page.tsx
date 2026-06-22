"use client";
import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getOrderColumns } from "@/src/components/admin/tables/tablesColumns/orders.columns";
import { useOrdersQuery } from "@/src/services/order";

export default function OrdersPage() {
    const { data, isLoading,isFetching } = useOrdersQuery();
    return (
    <section className="w-full px-10 flex flex-col mt-5">
      <div className="flex justify-end mb-4">
        <h2 className="text-xl font-bold">لیست سفارشات</h2>
      </div>

      <BaseTable
        data={data ?? []}
        loading={isLoading||isFetching}
        columns={getOrderColumns()}
      />
    </section>
    );
}