import { ReactNode } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default async function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout activeSection="projects">
      {children}
    </SidebarLayout>
  );
}
