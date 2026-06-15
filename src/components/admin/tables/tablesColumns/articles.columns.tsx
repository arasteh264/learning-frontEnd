import { Button, Popconfirm, Tag, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "jalali-moment";

export const getArticleColumns = (
  onEdit: any,
  onDelete: any
) => [
  {
    title: "تصویر",
    dataIndex: "cover",
    key: "cover",
    render: (cover: string) =>
      cover ? (
        <Image
          src={cover}
          alt="cover"
          width={60}
          height={40}
          style={{ objectFit: "cover", borderRadius: 6 }}
          preview
        />
      ) : (
        "—"
      ),
  },

  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "اسلاگ",
    dataIndex: "slug",
    key: "slug",
  },

  {
    title: "خلاصه",
    dataIndex: "summary",
    key: "summary",
    render: (text: string) =>
      text?.length > 50 ? `${text.slice(0, 50)}...` : text,
  },

  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "published" ? "green" : "orange"}>
        {status === "published" ? "منتشر شده" : "پیش نویس"}
      </Tag>
    ),
  },

  {
    title: "بازدید",
    dataIndex: "views",
    key: "views",
  },

  {
    title: "تاریخ ایجاد",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) => {
      if (!date) return "—";

      const persianDigits = [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹",
      ];

      const formatted = moment
        .utc(date)
        .local()
        .locale("fa")
        .format("YYYY/MM/DD HH:mm");

      return formatted.replace(
        /\d/g,
        (d) => persianDigits[Number(d)] as string
      );
    },
  },

  {
    title: "عملیات",
    key: "actions",
    render: (_: any, record: any) => (
      <div className="flex gap-2">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record.id)}
        />

        <Popconfirm
          title="آیا از حذف این مقاله مطمئن هستید؟"
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