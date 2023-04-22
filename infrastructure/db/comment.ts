import { CommentId } from "domain/comment";
import { prisma } from "~/db.server";

export const deleteComment = async (commentId: CommentId): Promise<void> => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};
