import { User, UserId } from "domain/user";
import { dnull } from "utils/dnull";
import { prisma } from "~/db.server";

export const getUser = async (userId: UserId): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user ? dnull(user) : null;
};

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });
  return users.map(dnull);
};
