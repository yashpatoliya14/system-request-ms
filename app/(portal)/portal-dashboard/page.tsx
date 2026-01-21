"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  CheckCircle2,
  Send,
  ImageIcon,
  ChevronRight,
  LayoutGrid,
  X,
  AlertCircle,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PortalDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests] = useState([
    {
      id: "SR-2005",
      subject: "Printer not working",
      type: "Hardware",
      dept: "IT Support",
      status: "Pending",
      date: "12 Jan 2026",
    },
    {
      id: "SR-2004",
      subject: "AC making noise",
      type: "Maintenance",
      dept: "Electrical",
      status: "In Progress",
      date: "10 Jan 2026",
    },
    {
      id: "SR-2001",
      subject: "Software Update",
      type: "Software",
      dept: "IT Support",
      status: "Completed",
      date: "05 Jan 2026",
    },
  ]);

  const stats = [
    { label: "Total", count: 12, variant: "default" as const },
    { label: "Pending", count: 3, variant: "warning" as const },
    { label: "Active", count: 4, variant: "info" as const },
    { label: "Closed", count: 5, variant: "success" as const },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Portal Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Raise and track your service requests.
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Raise New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">New Service Request</DialogTitle>
              <DialogDescription>
                Fill in the details below to submit a new service request.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Service Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Dept..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Support</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Request Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">Hardware Issue</SelectItem>
                      <SelectItem value="software">Software Installation</SelectItem>
                      <SelectItem value="network">Network Problem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Brief Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g. Printer not responding in Room 101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the problem..."
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Attach Evidence
                </Button>
                <Button className="flex-1 gap-2">
                  <Send className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className={`transition-all duration-300 hover:shadow-md ${stat.variant === "warning"
                ? "border-amber-200 bg-amber-50/50"
                : stat.variant === "info"
                  ? "border-blue-200 bg-blue-50/50"
                  : stat.variant === "success"
                    ? "border-emerald-200 bg-emerald-50/50"
                    : ""
              }`}
          >
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
              <p
                className={`mt-1 text-3xl font-bold ${stat.variant === "warning"
                    ? "text-amber-600"
                    : stat.variant === "info"
                      ? "text-blue-600"
                      : stat.variant === "success"
                        ? "text-emerald-600"
                        : ""
                  }`}
              >
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Table */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Recent Requests</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search request ID..."
                  className="w-64 pl-9"
                />
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
                <TableHead className="font-semibold">Request Details</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
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
                      <p className="text-xs text-muted-foreground">
                        Raised on {req.date}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{req.dept}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-50 transition-opacity group-hover:opacity-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}