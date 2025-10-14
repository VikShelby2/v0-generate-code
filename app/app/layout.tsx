import type React from "react";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/components/auth-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 pb-12">{children}</main>
      </div>
    </AuthProvider>
  );
}
