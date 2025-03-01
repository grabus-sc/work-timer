import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectId, ProjectSummary } from "domain/project";
import { getProjectsSummary, deleteProject } from "infrastructure/db/project";
import { ProjectsView } from "app/ui/main/projects";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  const title = "Jira clone - Projects";
  const description =
    "See all your projects in one place. Create new ones and assigne team members.";
  const image = "https://jira-clone.fly.dev/static/images/readme/projects.png";
  const url = "https://jira-clone.fly.dev/projects";

  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    title: title,
    description: description,
    "og:url": url,
    "og:type": "website",
    "og:site_name": title,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": "summary_large_image",
    "twitter:site": url,
    "twitter:domain": "jira-clone.fly.dev",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:image:width": "1297",
    "twitter:image:height": "635",
    "twitter:image:alt": title,
    "twitter:creator": "Jack_DanielSG",
    "twitter:creator:id": "Jack_DanielSG",
  };
};

type LoaderData = {
  projectsSummary: ProjectSummary[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  
  if (!userId) {
    return redirect("/login");
  }

  const projectsSummary = await getProjectsSummary(userId);

  return json<LoaderData>({ projectsSummary });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action") as string;

  if (_action === "delete") {
    const projectId = formData.get("projectId") as ProjectId;

    projectId
      ? await deleteProject(projectId)
      : console.error("Project id not found: ", projectId);
  }
  return redirect("/projects");
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="h-full w-full text-center">
      <h1 className="mt-[200px] mb-6 text-lg">/projects ERROR</h1>
      <a href="/" className="text-primary-main hover:underline">
        Navigate to home
      </a>
    </div>
  );
}

export default function Projects() {
  const { projectsSummary } = useLoaderData() as LoaderData;
  console.log(projectsSummary)
  return <ProjectsView projectsSummary={projectsSummary} />;
}
