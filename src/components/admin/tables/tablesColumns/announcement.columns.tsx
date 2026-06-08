import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getannouncementColumns = (
  onEdit: any,
  onDelete: any
) => [
  {
    title: "تاریخ پایان",
    dataIndex: "end_date",
    key: "end_date",
  },
  {
    title: "عنوان",
    dataIndex: "text",
    key: "text",
  },
    {
    title: "وضعیت",
    dataIndex: "is_active",
    key: "is_active",
  },
  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">

        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        />

        <Popconfirm
          title="آیا از حذف این دسته‌بندی مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => onDelete(record)}
        >
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>

      </div>
    ),
  },
];