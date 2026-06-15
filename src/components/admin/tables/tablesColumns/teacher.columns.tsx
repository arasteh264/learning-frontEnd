import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";

export const getTeacherColumns = (
  handleDelete: (id: string) => void,
  onVerify: (id: string) => void
) => [
  {
    title: "نام استاد",
    dataIndex: ["users", "name"],
    key: "name",
  },

  {
    title: "ایمیل استاد",
    dataIndex: ["users", "email"],
    key: "email",
  },

  {
    title: "توضیحات",
    dataIndex: "bio",
    key: "bio",
    render: (bio: string) => bio || "—",
  },

  {
    title: "وضعیت تایید",
    dataIndex: "is_verified",
    key: "is_verified",
    render: (is_verified: boolean) =>
      is_verified ? (
        <Tag color="green">تایید شده</Tag>
      ) : (
        <Tag color="red">تایید نشده</Tag>
      ),
  },

  {
    title: "تخصص‌ها",
    dataIndex: "expertise",
    key: "expertise",
    render: (expertise: any[] = []) =>
      expertise.length > 0 ? (
        expertise.map((exp, index) => (
          <Tag color="purple" key={index}>
            {exp}
          </Tag>
        ))
      ) : (
        "—"
      ),
  },

  {
    title: "امتیاز",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => rating ?? "—",
  },

  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">
        {!record.is_verified && (
          <Popconfirm
            title="آیا این استاد تایید شود؟"
            okText="بله"
            cancelText="نه"
            onConfirm={() => onVerify(record.id)}
          >
            <Tooltip title="تایید استاد">
              <Button
                type="text"
                icon={<CheckOutlined style={{ color: "green" }} />}
              />
            </Tooltip>
          </Popconfirm>
        )}

        <Popconfirm
          title="آیا از حذف این استاد مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => handleDelete(record.id)}
        >
          <Tooltip title="حذف">
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  },
];