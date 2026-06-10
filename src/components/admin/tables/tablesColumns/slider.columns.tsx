import { Button, Popconfirm, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getSliderColumns = (onEdit: any, onDelete: any) => [
  {
    title: "عکس",
    dataIndex: "image_url",
    key: "image_url",
    render: (url: string) => (
      <Image src={url} alt="slider" width={80} height={50} style={{ objectFit: "cover", borderRadius: 6 }} />
    ),
  },
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "لینک",
    dataIndex: "link",
    key: "link",
  },
  {
    title: "ترتیب",
    dataIndex: "order",
    key: "order",
  },
  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">
        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
        <Popconfirm
          title="آیا از حذف مطمئن هستید؟"
          okText="بله"
          cancelText="نه"
          onConfirm={() => onDelete(record)}
        >
          <Button danger type="text" icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    ),
  },
];