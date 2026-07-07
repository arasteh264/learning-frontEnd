"use client";

import { useState } from "react";
import Image from "next/image";
import { CornerUpLeft, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postCommentReply } from "@/src/services/course";
import { ApiError } from "@/src/types/globalType";

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
  courseId: string | number;
};

function UserRow({ user, date }: { user: User; date: string }) {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className="flex flex-col">
        <div className="flex items-center gap-x-2 text-xs">
          <span className="font-medium text-[#1C2B27]">{user.name}</span>
          <div className="size-1 bg-gray-300 rounded-full" />
          <span className="text-gray-400">{user.role}</span>
        </div>
        <span className="text-[11px] text-gray-400">{date}</span>
      </div>
      <Image
        src={user.avatar}
        alt={user.name}
        width={32}
        height={32}
        className="size-8 object-cover rounded-full"
      />
    </div>
  );
}

export default function CommentCard({ comment, courseId }: Props) {
  const queryClient = useQueryClient();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const replyMutation = useMutation({
    mutationFn: () =>
      postCommentReply({ commentId: comment.id, content: replyText }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseDetails", courseId] });
      toast.success("پاسخ شما ثبت شد");
      setReplyText("");
      setIsReplying(false);
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در ثبت پاسخ");
    },
  });

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    replyMutation.mutate();
  };

  return (
    <div className="p-4 border border-gray-100 rounded-xl bg-white">
      <div className="flex items-start justify-between pb-3 border-b border-gray-50">
        <button
          type="button"
          onClick={() => setIsReplying((p) => !p)}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#1EB35B] transition-colors mt-1"
        >
          <CornerUpLeft className="size-3.5" />
          پاسخ
        </button>
        <UserRow user={comment.user} date={comment.date} />
      </div>

      <div className="text-xs text-gray-600 whitespace-pre-line py-4 leading-6 text-right">
        {comment.content}
      </div>

      {isReplying && (
        <div className="mb-3 flex items-end gap-2 bg-[#fafafa] rounded-lg p-2.5">
          <button
            type="button"
            onClick={handleReplySubmit}
            disabled={!replyText.trim() || replyMutation.isPending}
            className="shrink-0 size-8 rounded-full bg-[#1EB35B] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#brand] transition-colors"
            aria-label="ارسال پاسخ"
          >
            <Send className="size-3.5" />
          </button>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="پاسخ خود را بنویسید..."
            rows={1}
            autoFocus
            className="flex-1 resize-none bg-transparent text-xs text-right outline-none placeholder:text-gray-400 py-1.5"
          />
        </div>
      )}

      {comment.reply && (
        <div className="p-4 bg-[#fafafa] rounded-lg mr-3 ml-3">
          <div className="flex items-start justify-end pb-3 mb-3 border-b border-gray-200">
            <UserRow user={comment.reply.user} date={comment.reply.date} />
          </div>
          <div className="text-xs text-gray-600 whitespace-pre-line text-right leading-6">
            {comment.reply.content}
          </div>
        </div>
      )}
    </div>
  );
}
