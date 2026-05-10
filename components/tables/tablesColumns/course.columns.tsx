import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getCourseColumns = (
  onEdit?: (record: any) => void,
  onDelete?: (id: string) => void,
  onPreview?: (cover: string) => void
) => [
  {
    title: "عنوان دوره",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "مدرس",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "دسته بندی",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "تخفیف",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "کاور",
    dataIndex: "cover",
    key: "cover",
    render: (cover: string) => (
      <span
        className="text-blue-500 cursor-pointer hover:underline"
        onClick={() => onPreview?.(cover)}
      >
        پیش‌نمایش
      </span>
    ),
  },
  {
    title: "تعداد جلسات",
    dataIndex: "sessionCount",
    key: "sessionCount",
    render: (count: number) => (
      <span>
        {count > 0 ? `${count} جلسه` : "بدون جلسه"}
      </span>
    ),
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) =>
      status ? "فعال" : "غیرفعال",
  },
  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => {
      const hasSessions = record.sessionCount > 0;

      return (
        <div className="flex gap-2">

          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record.id)}
          />

          <Popconfirm
            title={
              hasSessions
                ? `⚠ این دوره ${record.sessionCount} جلسه دارد. ایا اطمینان دارید حذف شود؟`
                : "آیا از حذف این دوره اطمینان دارید ؟"
            }
            okText="بله"
            cancelText="نه"
            onConfirm={() => onDelete?.(record.id)}
          >
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>

        </div>
      );
    },
  },
];