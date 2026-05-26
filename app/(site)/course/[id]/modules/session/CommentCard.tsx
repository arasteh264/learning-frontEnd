import Image from "next/image";

type User = {
  name: string;
  role: string;
  avatar: string;
};

type Reply = {
  user: User;
  date: string;
  content: string;
};

export type Comment = {
  id: string;
  user: User;
  date: string;
  content: string;
  reply?: Reply | null;
};

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <div className="p-2 border border-gray-200 rounded-lg bg-white justify-end">
      <div className="flex items-start   py-2 border-b border-gray-100 justify-end">
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2 text-xs">
              <span>{comment.user.name}</span>
              <div className="size-1 text-xs bg-gray-300 rounded-full" />
              <span className="text-gray-500">{comment.user.role}</span>
            </div>

            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={20}
            height={20}
            className="size-8 object-cover rounded-full"
          />
        </div>
      </div>

      <div className="text-xs text-gray-700 whitespace-pre-line py-5">
        {comment.content}
      </div>

      {comment.reply && (
        <div className="p-5 bg-gray-100 rounded-lg mr-3 ml-3">
          <div className="flex items-start justify-end pb-3.5 mb-3.5 border-b border-gray-200">
            <div className="flex items-center gap-x-2.5">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2 text-xs">
                  <span>{comment.reply.user.name}</span>
                  <div className="size-1 text-xs bg-gray-300 rounded-full" />
                  <span className="text-gray-500">
                    {comment.reply.user.role}
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {comment.reply.date}
                </span>
              </div>
              <Image
                src={comment.reply.user.avatar}
                alt={comment.reply.user.name}
                width={20}
                height={20}
                className="size-8 object-cover rounded-full"
              />
            </div>
          </div>

          <div className="text-xs text-gray-700 whitespace-pre-line">
            {comment.reply.content}
          </div>
        </div>
      )}
    </div>
  );
}
