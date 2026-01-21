"use client";

import React from "react";
import { Users, Building, Activity, ShieldCheck, ArrowUpRight, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const systemStats = [
    {
      label: "Total Users",
      value: "1,240",
      change: "+12%",
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50"
    },
    {
      label: "Departments",
      value: "18",
      change: "+2",
      icon: Building,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50"
    },
    {
      label: "Active Services",
      value: "42",
      change: "+8%",
      icon: Activity,
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50"
    },
    {
      label: "System Health",
      value: "99.9%",
      change: "Excellent",
      icon: ShieldCheck,
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50"
    },
  ];

  const recentActivity = [
    { action: "New department created", dept: "Finance", time: "2 minutes ago", status: "completed" },
    { action: "User role updated", dept: "IT Support", time: "15 minutes ago", status: "completed" },
    { action: "Service type modified", dept: "Maintenance", time: "1 hour ago", status: "pending" },
    { action: "Request mapping updated", dept: "HR", time: "2 hours ago", status: "completed" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            System <span className="text-primary">Overview</span>
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/25">
          <TrendingUp className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
          <Card key={i} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`rounded-lg ${stat.bgLight} p-2 transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className={`h-4 w-4 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                <stat.icon className={`h-4 w-4 text-primary`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1">
                <Badge variant="secondary" className="text-xs font-medium">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Welcome Banner */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary via-primary to-violet-700 text-primary-foreground shadow-xl shadow-primary/20">
        <CardContent className="relative p-8">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="text-2xl font-bold md:text-3xl">
              Welcome back, Super Admin! 👋
            </h2>
            <p className="text-primary-foreground/80">
              Everything is running smoothly. There are <span className="font-semibold text-white">4 new department requests</span> and <span className="font-semibold text-white">2 service updates</span> pending your review.
            </p>
            <Button
              variant="secondary"
              className="mt-4 gap-2 bg-white text-primary hover:bg-white/90"
            >
              View Requests
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system changes and updates</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.dept} • {item.time}
                  </p>
                </div>
                <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}