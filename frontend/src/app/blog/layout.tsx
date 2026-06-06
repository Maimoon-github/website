import { ReactNode } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout activeSection="blog">
      {children}
    </SidebarLayout>
  );
}
