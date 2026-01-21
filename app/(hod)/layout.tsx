"use client";

import React from "react";
import AppSidebar from "@/components/AppSidebar";

export default function HODLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar variant="hod" />
      <main className="ml-64 flex-1">
        <div className="container max-w-7xl p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}