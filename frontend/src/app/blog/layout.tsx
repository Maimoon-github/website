import { ReactNode } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default async function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout activeSection="blog">
      {children}
    </SidebarLayout>
  );
}
