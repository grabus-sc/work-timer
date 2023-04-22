import { User } from "domain/user";
import { Category } from "domain/category";

export type ProjectId = string;
export interface Project {
  id: ProjectId;
  name: string;
  color: "#333";
  description?: string;
  users: User[];
  categories: Category[];
  image: string;
  createdAt?: number;
  updatedAt?: number;
  userId: "";
}

// TODO: Make createdAt and updatedAt mandatory
export type ProjectSummary = Pick<Project, "id" | "name" | "description" | "image" | "createdAt">;
