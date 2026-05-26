import { MessagesSquare } from "lucide-react";
import CommentCard, { Comment } from "./CommentCard";

type Props = {
  comments: Comment[];
};

export default function CommentList({ comments }: Props) {
  return (
    <div className="bg-[#fafafa] mt-5 px-5 py-5">
           <div className="flex justify-end items-center gap-1 mb-4">
        <h1>نظرات</h1>
        <MessagesSquare  className="size-7 md:size-9 text-[#1EB35B]" />
      </div>
    <div className="space-y-4 ">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
    </div>
  );
}