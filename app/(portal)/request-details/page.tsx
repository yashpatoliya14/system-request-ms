"use client";

import React, { useState } from "react";
import { Plus, Trash2, Send, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function UserRequestPortal() {
  const departments = [
    { id: 1, name: "IT Support" },
    { id: 2, name: "Electrical" },
    { id: 3, name: "Maintenance" },
  ];

  const serviceTypes = [
    { id: 1, deptId: 1, name: "Software Install" },
    { id: 2, deptId: 1, name: "Hardware Repair" },
    { id: 3, deptId: 2, name: "Power Failure" },
    { id: 4, deptId: 3, name: "AC Repair" },
  ];

  const [requests, setRequests] = useState([
    { id: "REQ-101", title: "Monitor not working", dept: "IT Support", type: "Hardware Repair", status: "In Progress", date: "2023-11-10" },
    { id: "REQ-102", title: "Software installation required", dept: "IT Support", type: "Software Install", status: "Pending", date: "2023-11-12" },
    { id: "REQ-103", title: "AC not cooling properly", dept: "Maintenance", type: "AC Repair", status: "Completed", date: "2023-11-08" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    deptId: "",
    typeId: "",
    subject: "",
    description: "",
  });

  const handleCreateRequest = () => {
    if (!formData.deptId || !formData.subject) {
      return;
    }

    const deptName = departments.find((d) => d.id === Number(formData.deptId))?.name || "";
    const typeName = serviceTypes.find((t) => t.id === Number(formData.typeId))?.name || "";

    const newRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.subject,
      dept: deptName,
      type: typeName,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setRequests([newRequest, ...requests]);
    setIsModalOpen(false);
    setFormData({ deptId: "", typeId: "", subject: "", description: "" });
  };

  const handleCancelRequest = (id: string) => {
    if (confirm("Are you sure you want to cancel this request?")) {
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  const filteredTypes = serviceTypes.filter((t) => t.deptId === Number(formData.deptId));

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          </div>
          <p className="text-muted-foreground">
            Track and manage your support tickets
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Submit New Request</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new support ticket.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Department</Label>
                  <Select
                    value={formData.deptId}
                    onValueChange={(value) => setFormData({ ...formData, deptId: value, typeId: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Dept..." />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select
                    value={formData.typeId}
                    onValueChange={(value) => setFormData({ ...formData, typeId: value })}
                    disabled={!formData.deptId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredTypes.map((t) => (
                        <SelectItem key={t.id} value={t.id.toString()}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subject / Issue Title</Label>
                <Input
                  placeholder="Briefly describe the problem"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleCreateRequest} className="flex-1 gap-2">
                  Submit Ticket
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Discard
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="text-2xl font-bold text-primary">{requests.length}</div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="text-2xl font-bold text-amber-600">{requests.filter((r) => r.status === "Pending").length}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="text-2xl font-bold text-emerald-600">{requests.filter((r) => r.status === "Completed").length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Request History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Ticket ID</TableHead>
                <TableHead className="font-semibold">Issue Details</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id} className="group">
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      #{req.id}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{req.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {req.dept} • {req.type}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {req.status === "Pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleCancelRequest(req.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button asChild size="sm" className="gap-1">
                        <Link href={`/request-details/${req.id}`}>
                          View Thread
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
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