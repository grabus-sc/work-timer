import { v4 as uuid } from "uuid";
import { Comment } from "domain/comment";
import { UserAvatar } from "app/components/user-avatar";
import { EditBox } from "./edit-box";
import { User } from "domain/user";

export const CreateComment = ({
  addComment,
  user,
}: CreateCommentProps): JSX.Element => {

  const save = (message: string) => {
    addComment({
      id: "temp-" + uuid(),
      user,
      message,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  return (
    <div className="mt-4 flex items-start gap-6">
      <UserAvatar {...user} />
      <EditBox defaultMessage="" save={save} />
    </div>
  );
};

interface CreateCommentProps {
  addComment: (comment: Comment) => void;
  user: User;
}
