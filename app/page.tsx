"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const dashboards = [
    {
      title: "Admin Dashboard",
      description: "Full system control with access to all master data, user management, and system configuration.",
      icon: ShieldCheck,
      href: "/admin-dashboard",
      gradient: "from-violet-500 to-purple-600",
      credentials: "admin@service.com / admin123",
    },
    {
      title: "HOD Dashboard",
      description: "Department management, technician assignment, and request oversight for department heads.",
      icon: Users,
      href: "/hod-dashboard",
      gradient: "from-emerald-500 to-teal-500",
      credentials: "hod@service.com / hod123",
    },
    {
      title: "Portal Dashboard",
      description: "User portal for raising service requests, tracking status, and communication.",
      icon: Zap,
      href: "/portal-dashboard",
      gradient: "from-blue-500 to-cyan-500",
      credentials: "user@service.com / user123",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/30">
            <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            Service<span className="text-primary">OS</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Enterprise Service Request Management System. Choose a dashboard below to get started or{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              login with credentials
            </Link>
            .
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {dashboards.map((dashboard, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Gradient accent */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dashboard.gradient}`} />

              <CardHeader className="pb-4">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${dashboard.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <dashboard.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{dashboard.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {dashboard.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Demo Credentials</p>
                  <code className="text-xs">{dashboard.credentials}</code>
                </div>

                <Button asChild className="w-full gap-2 shadow-lg shadow-primary/20">
                  <Link href={dashboard.href}>
                    Open Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Login Link */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Want to login with your credentials?
          </p>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/login">
              Go to Login Page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid gap-8 border-t pt-16 md:grid-cols-3">
          {[
            { title: "Modern UI", desc: "Beautiful shadcn/ui components with smooth animations" },
            { title: "Role-Based Access", desc: "Separate dashboards for Admin, HOD, and Users" },
            { title: "Request Management", desc: "Complete CRUD operations for service requests" },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
