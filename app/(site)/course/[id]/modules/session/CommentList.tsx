"use client";

import { useState } from "react";
import { MessagesSquare, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postCourseComment } from "@/src/services/course";
import CommentCard, { Comment } from "./CommentCard";

type Props = {
  courseId: string | number;
  comments: Comment[];
};

export default function CommentList({ courseId, comments }: Props) {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const commentMutation = useMutation({
    mutationFn: () => postCourseComment({ courseId, content: text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseDetails", courseId] });
      toast.success("نظر شما با موفقیت ثبت شد");
      setText("");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "خطا در ثبت نظر");
    },
  });

  const handleSubmit = () => {
    if (!text.trim()) return;
    commentMutation.mutate();
  };

  return (
    <div className="bg-[#fafafa] mt-5 px-5 py-5 rounded-xl">
      <div className="flex justify-end items-center gap-2 mb-4">
        <h2 className="font-bold text-[#1C2B27]">نظرات</h2>
        <span className="text-xs text-gray-400">
          ({comments.length.toLocaleString("fa-IR")})
        </span>
        <MessagesSquare className="size-7 md:size-9 text-[#1EB35B]" />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-3 mb-5 flex items-end gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() || commentMutation.isPending}
          className="shrink-0 size-9 rounded-full bg-[#1EB35B] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#17914a] transition-colors"
          aria-label="ارسال نظر"
        >
          <Send className="size-4" />
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="نظر خود را درباره این دوره بنویسید..."
          rows={1}
          className="flex-1 resize-none text-xs text-right outline-none placeholder:text-gray-400 py-2"
        />
      </div>

      {comments.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">
          هنوز نظری برای این دوره ثبت نشده. اولین نفر باشید.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} courseId={courseId} />
          ))}
        </div>
      )}
    </div>
  );
}