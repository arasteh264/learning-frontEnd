import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

export interface Order {
  id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
  };
  totalprice: number;
  status: "pending" | "awaiting_payment" | "paid" | "failed" | "cancelled";
  created_at: string;
  updated_at: string;
}

type StatusConfig = {
  label: string;
  color: string;
};

const statusConfig: { [key: string]: StatusConfig } = {
  pending: { label: "در انتظار", color: "default" },
  awaiting_payment: { label: "در انتظار پرداخت", color: "blue" },
  paid: { label: "پرداخت شده", color: "green" },
  failed: { label: "ناموفق", color: "red" },
  cancelled: { label: "لغو شده", color: "orange" },
};

export const getOrderColumns = (): ColumnsType<Order> => [
  {
    title: "شناسه سفارش",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "کاربر",
    dataIndex: "user",
    key: "user",
    render: (user: Order["user"]) => user?.name || "—",
  },
  {
    title: "مبلغ",
    dataIndex: "totalprice",
    key: "totalprice",
    render: (amount: number) =>
      amount === 0 ? "رایگان" : `${amount.toLocaleString("fa-IR")} تومان`,
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const config = statusConfig[status] || {
        label: status,
        color: "default",
      };
      return <Tag color={config.color}>{config.label}</Tag>;
    },
  },
  {
    title: "تاریخ ثبت",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) =>
      new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  },
];