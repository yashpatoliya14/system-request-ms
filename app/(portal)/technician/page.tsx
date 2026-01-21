"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle2, Clock, MessageSquare, ChevronRight, Filter, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TechnicianDashboard() {
  const [requests, setRequests] = useState([
    { id: "SR-1001", type: "Hardware Repair", priority: "High", status: "Pending", date: "2023-10-24", user: "Monil Kansagra", desc: "Printer not responding in IT Dept." },
    { id: "SR-1002", type: "Software Install", priority: "Medium", status: "In Progress", date: "2023-10-25", user: "Rahul Shah", desc: "Need MS Office activation on Room 402." },
    { id: "SR-1003", type: "Wiring Issue", priority: "Urgent", status: "In Progress", date: "2023-10-26", user: "Amit Patel", desc: "Main server room light flickering." },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req)));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>;
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = [
    { label: "Assigned", count: requests.length, icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { label: "In Progress", count: requests.filter((r) => r.status === "In Progress").length, icon: Loader2, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { label: "Completed", count: requests.filter((r) => r.status === "Completed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Technician Workspace</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your assigned service tasks and updates
          </p>
        </div>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-2 px-4 py-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Shift: 09:00 - 18:00</span>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className={`${stat.bg} ${stat.border} transition-all duration-300 hover:shadow-md`}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-xl bg-white/80 p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count} Tasks</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Active Tasks</h2>
          <Button variant="ghost" size="sm" className="gap-2 text-primary">
            <Filter className="h-4 w-4" />
            Filter List
          </Button>
        </div>

        <div className="space-y-4">
          {requests.map((task) => (
            <Card key={task.id} className="group transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Task Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono bg-foreground text-background">
                        {task.id}
                      </Badge>
                      {getStatusBadge(task.status)}
                      {task.priority === "Urgent" && (
                        <Badge className="animate-pulse bg-rose-500 text-white hover:bg-rose-500">
                          Urgent
                        </Badge>
                      )}
                      {task.priority === "High" && (
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
                          High Priority
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{task.type}</h3>
                      <p className="mt-1 text-muted-foreground">{task.desc}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {task.user.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>Requested by {task.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Assigned on {task.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 lg:min-w-[200px] lg:flex-col">
                    {task.status !== "Completed" ? (
                      <>
                        <Button
                          className="flex-1 gap-2"
                          onClick={() => updateStatus(task.id, task.status === "Pending" ? "In Progress" : "Completed")}
                        >
                          {task.status === "Pending" ? "Start Task" : "Mark as Done"}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Post Reply
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <CheckCircle2 className="mb-1 h-6 w-6 text-emerald-500" />
                        <span className="text-xs font-bold uppercase text-emerald-700">Task Closed</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}