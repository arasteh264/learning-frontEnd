import { Button, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { StopOutlined } from "@ant-design/icons";
import { UserSwitchOutlined } from "@ant-design/icons";
export const getUserColumns = (
  onEdit: (record: any) => void,
  onDelete: (id: string) => void,
  onToggleBan: (record: any) => void,
  onToggleRole: (record: any) => void
) => [
  {
    title: "نام کاربری",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ایمیل",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "شماره موبایل",
    dataIndex: "phone",
    key: "phone",
  },

  {
    title: "نقش",
    dataIndex: "role",
    key: "role",
    render: (role: string) => (
      <Tag color={role === "ADMIN" ? "red" : "green"}>
        {role === "ADMIN" ? "ادمین" : "کاربر"}
      </Tag>
    ),
  },
{
  title: "وضعیت",
  dataIndex: "isBanned",
  key: "isBanned",
  render: (isBanned: boolean) =>
    isBanned ? (
      <span className="text-red-500 font-semibold">بن شده</span>
    ) : (
      <span className="text-green-600">فعال</span>
    ),
},
{
  title: "عملیات",
  key: "actions",
  render: (_: any, record: any) => (
    <div className="flex gap-2">



   
      <Popconfirm
        title={
          record.role === "ADMIN"
            ? "تبدیل به کاربر عادی؟"
            : "ارتقا به ادمین؟"
        }
        description={
          record.role === "ADMIN"
            ? "دسترسی‌های مدیریتی حذف خواهد شد"
            : "کاربر دسترسی کامل خواهد گرفت"
        }
        okText="تایید"
        cancelText="لغو"
        onConfirm={() => onToggleRole(record)}
      >
        <Button
          type="text"
          icon={<UserSwitchOutlined />}
          className={
            record.role === "ADMIN"
              ? "!text-red-500"
              : "!text-blue-500"
          }
        />
      </Popconfirm>

      {/* BAN / UNBAN */}
      <Popconfirm
        title={
          record.isBanned
            ? "آنبن کردن کاربر؟"
            : "بن کردن کاربر؟"
        }
        okText="تایید"
        cancelText="لغو"
        onConfirm={() => onToggleBan(record)}
      >
        <Button
          type="text"
          icon={<StopOutlined />}
          className={record.isBanned ? "!text-green-500" : "!text-red-500"}
        />
      </Popconfirm>

      {/* DELETE */}
      <Popconfirm
        title="حذف کاربر؟"
        okText="بله"
        cancelText="نه"
        onConfirm={() => onDelete(record._id || record.id)}
      >
        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
        />
      </Popconfirm>

    </div>
  ),
}
];