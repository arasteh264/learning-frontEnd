import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

export interface Transaction {
  id: string;
  order_id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    phone: string;
  };
  order: {
    id: string;
    totalprice: number;
    status: string;
  };
  amount: number;
  status: "pending" | "success" | "failed";
  authority: string;
  ref_id: string | null;
  gateway: string;
  created_at: string;
}

const statusConfig: { [key: string]: { label: string; color: string } } = {
  pending: { label: "در انتظار", color: "default" },
  success: { label: "موفق", color: "green" },
  failed: { label: "ناموفق", color: "red" },
};

export const getTransactionColumns = (): ColumnsType<Transaction> => [
  {
    title: "شناسه تراکنش",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "کاربر",
    dataIndex: "user",
    key: "user",
    render: (user: Transaction["user"]) =>
      user ? (
        <div className="flex flex-col">
          <span className="text-xs">{user.name}</span>
          <span className="text-[11px] text-gray-400">{user.phone}</span>
        </div>
      ) : (
        "—"
      ),
  },
  {
    title: "مبلغ",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => `${amount.toLocaleString("fa-IR")} تومان`,
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const config = statusConfig[status] || { label: status, color: "default" };
      return <Tag color={config.color}>{config.label}</Tag>;
    },
  },
  {
    title: "درگاه",
    dataIndex: "gateway",
    key: "gateway",
  },
  {
    title: "کد رهگیری",
    dataIndex: "ref_id",
    key: "ref_id",
    render: (refId: string | null) => refId || "—",
  },
  {
    title: "تاریخ",
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