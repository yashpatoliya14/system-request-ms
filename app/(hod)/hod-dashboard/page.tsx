"use client";

import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  UserPlus,
  Search,
  Filter,
  X,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Request {
  id: string;
  subject: string;
  requester: string;
  priority: string;
  status: string;
  date: string;
  technician: string | null;
}

interface Technician {
  id: number;
  name: string;
  expertise: string;
}

export default function HODDashboard() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "SR-3001",
      subject: "Network Switch Failure",
      requester: "John Doe",
      priority: "High",
      status: "Unassigned",
      date: "13 Jan 2026",
      technician: null,
    },
    {
      id: "SR-3002",
      subject: "New PC Setup",
      requester: "Jane Smith",
      priority: "Medium",
      status: "Assigned",
      date: "12 Jan 2026",
      technician: "Rahul (Tech)",
    },
    {
      id: "SR-3003",
      subject: "ERP Access Issue",
      requester: "Mike Ross",
      priority: "High",
      status: "Unassigned",
      date: "13 Jan 2026",
      technician: null,
    },
  ]);

  const [technicians] = useState<Technician[]>([
    { id: 1, name: "Rahul Sharma", expertise: "Hardware" },
    { id: 2, name: "Amit Patel", expertise: "Network" },
    { id: 3, name: "Suresh Varma", expertise: "Software" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleAssign = (techName: string) => {
    setRequests(
      requests.map((req) =>
        req.id === selectedRequest?.id
          ? { ...req, status: "Assigned", technician: techName }
          : req
      )
    );
    setIsAssignModalOpen(false);
  };

  const stats = [
    {
      label: "Unassigned",
      count: requests.filter((r) => r.status === "Unassigned").length,
      icon: AlertCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    {
      label: "In Progress",
      count: requests.filter((r) => r.status === "Assigned").length,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Technicians",
      count: technicians.length,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">HOD Control Center</h1>
          </div>
          <p className="text-muted-foreground">
            Department: <span className="font-medium text-foreground">IT & Infrastructure</span>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className={`${stat.bg} ${stat.border} transition-all duration-300 hover:shadow-md`}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
              <div className={`rounded-2xl bg-white/80 p-4 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Table */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Pending Assignments</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="w-48 pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Issue Details</TableHead>
                <TableHead className="font-semibold">Requester</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Assigned Tech</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id} className="group">
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="font-mono text-xs">
                        {req.id}
                      </Badge>
                      <p className="font-medium">{req.subject}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    {req.requester}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        req.priority === "High"
                          ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      }
                    >
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {req.technician ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">{req.technician}</span>
                      </div>
                    ) : (
                      <span className="italic text-muted-foreground">Not Assigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!req.technician ? (
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          setSelectedRequest(req);
                          setIsAssignModalOpen(true);
                        }}
                      >
                        <UserPlus className="h-3 w-3" />
                        Assign
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="opacity-50 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Assign Technician</DialogTitle>
            <DialogDescription>
              Ticket: <span className="font-mono font-semibold">{selectedRequest?.id}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Select Expert
            </p>
            {technicians.map((tech) => (
              <button
                key={tech.id}
                onClick={() => handleAssign(tech.name)}
                className="group flex w-full items-center justify-between rounded-xl border bg-muted/30 p-4 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/10 transition-colors group-hover:border-primary/30">
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      {tech.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tech.expertise} Specialization
                    </p>
                  </div>
                </div>
                <UserPlus className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}