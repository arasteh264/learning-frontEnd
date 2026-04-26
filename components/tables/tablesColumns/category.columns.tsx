import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getCategoryColumns = (
  onEdit: any,
  onDelete: any
) => [
  {
    title: "عنوان دسته‌بندی",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "لینک",
    dataIndex: "href",
    key: "href",
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
          onConfirm={() => onDelete(record.id)}
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