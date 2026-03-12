"use client";

import React, { useEffect, useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiClient } from "@/lib/apiClient";

// ---- Types ----
interface ServiceRequest {
  ServiceRequestID: string;
  Title: string;
  Description: string;
  Priority: string;
  StatusID: string | null;
  Created: string;
  ServiceRequestTypeID: string | null;
  RequestorID: string | null;
  AssignedToID: string | null;
  Users?: { FullName: string } | null;
  ServiceRequestType?: { RequestTypeName: string } | null;
}

interface UserInfo {
  userId: string;
  email: string;
  role: string;
  fullName: string;
  username: string;
}

export default function TechnicianDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ---- Fetch user info ----
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get<UserInfo[]>("/api/auth/me");
        if (res.success && res.data?.[0]) {
          setUser(res.data[0] as unknown as UserInfo);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // ---- Fetch requests assigned to this technician ----
  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Try fetching by technician's user ID
      const res = await apiClient.get<ServiceRequest[][]>(
        `/api/portal/technician/${user.userId}`
      );
      if (res.success && res.data?.[0]) {
        setRequests(res.data[0]);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Failed to fetch technician requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ---- Update request status ----
  const handleUpdateStatus = async (requestId: string, newStatusId: string) => {
    setUpdatingId(requestId);
    try {
      const res = await apiClient.put(`/api/portal/technician/${requestId}`, {
        StatusID: newStatusId,
      });
      if (res.success) {
        // Update local state
        setRequests((prev) =>
          prev.map((r) =>
            String(r.ServiceRequestID) === String(requestId)
              ? { ...r, StatusID: newStatusId }
              : r
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---- Helpers ----
  const getStatusLabel = (statusId: string | null) => {
    if (!statusId) return "Pending";
    const id = Number(statusId);
    if (id === 1) return "Pending";
    if (id === 2) return "In Progress";
    if (id === 3) return "Completed";
    return "Pending";
  };

  const getStatusBadge = (statusId: string | null) => {
    const label = getStatusLabel(statusId);
    switch (label) {
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>;
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{label}</Badge>;
    }
  };

  const getPriorityLabel = (priority: string | null) => {
    if (!priority) return null;
    const p = Number(priority);
    if (p >= 4) return "Urgent";
    if (p === 3) return "High";
    if (p === 2) return "Medium";
    return "Low";
  };

  // Next status transition: Pending → In Progress (2) → Completed (3)
  const getNextStatusId = (currentStatusId: string | null) => {
    const label = getStatusLabel(currentStatusId);
    if (label === "Pending") return "2";
    if (label === "In Progress") return "3";
    return null;
  };

  const getNextActionLabel = (currentStatusId: string | null) => {
    const label = getStatusLabel(currentStatusId);
    if (label === "Pending") return "Start Task";
    if (label === "In Progress") return "Mark as Done";
    return null;
  };

  // ---- Stats ----
  const stats = [
    {
      label: "Assigned",
      count: requests.length,
      icon: AlertCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "In Progress",
      count: requests.filter((r) => getStatusLabel(r.StatusID) === "In Progress").length,
      icon: Loader2,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Completed",
      count: requests.filter((r) => getStatusLabel(r.StatusID) === "Completed").length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
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
            <span className="text-sm font-semibold">
              {user?.fullName || "Technician"} — Active
            </span>
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
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {loading ? "—" : `${stat.count} Tasks`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Active Tasks</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : requests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Wrench className="mb-2 h-10 w-10 opacity-30" />
              <p className="font-medium">No tasks assigned</p>
              <p className="text-sm">You have no requests assigned to you at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((task) => {
              const priorityLabel = getPriorityLabel(task.Priority);
              const nextStatusId = getNextStatusId(task.StatusID);
              const nextActionLabel = getNextActionLabel(task.StatusID);
              const isUpdating = updatingId === String(task.ServiceRequestID);

              return (
                <Card key={String(task.ServiceRequestID)} className="group transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      {/* Task Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-mono bg-foreground text-background">
                            SR-{String(task.ServiceRequestID)}
                          </Badge>
                          {getStatusBadge(task.StatusID)}
                          {priorityLabel === "Urgent" && (
                            <Badge className="animate-pulse bg-rose-500 text-white hover:bg-rose-500">
                              Urgent
                            </Badge>
                          )}
                          {priorityLabel === "High" && (
                            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
                              High Priority
                            </Badge>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {task.ServiceRequestType?.RequestTypeName || task.Title}
                          </h3>
                          <p className="mt-1 text-muted-foreground">
                            {task.Description || task.Title}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                                {(task.Users?.FullName || "U")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>Requested by {task.Users?.FullName || "User"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Assigned on {new Date(task.Created).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 lg:min-w-[200px] lg:flex-col">
                        {nextStatusId && nextActionLabel ? (
                          <Button
                            className="flex-1 gap-2"
                            disabled={isUpdating}
                            onClick={() =>
                              handleUpdateStatus(String(task.ServiceRequestID), nextStatusId)
                            }
                          >
                            {isUpdating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              nextActionLabel
                            )}
                            {!isUpdating && <ChevronRight className="h-4 w-4" />}
                          </Button>
                        ) : (
                          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <CheckCircle2 className="mb-1 h-6 w-6 text-emerald-500" />
                            <span className="text-xs font-bold uppercase text-emerald-700">
                              Task Closed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}