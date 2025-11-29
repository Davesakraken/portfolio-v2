import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="flex min-h-screen pt-24 sm:pt-28">{children}</div>;
}

export default Layout;
