"use client";

import React, { useState } from "react";
import { UserCog, Plus, Link2, Trash2, Search, Filter, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export default function RequestMappingMaster() {
  const [mappings, setMappings] = useState([
    { id: 1, requestType: "Hardware Repair", staffName: "Rahul Sharma", role: "Senior Technician", dept: "IT Support" },
    { id: 2, requestType: "Software Install", staffName: "Suresh Varma", role: "Technician", dept: "IT Support" },
    { id: 3, requestType: "AC Repair", staffName: "Amit Patel", role: "Maintenance Lead", dept: "Maintenance" },
    { id: 4, requestType: "Network Issue", staffName: "Vijay Shah", role: "HOD", dept: "IT Support" },
  ]);

  const [requestTypes] = useState(["Hardware Repair", "Software Install", "Network Issue", "AC Repair", "Wiring Issue"]);
  const [staffList] = useState([
    { name: "Rahul Sharma", role: "Senior Technician" },
    { name: "Amit Patel", role: "Maintenance Lead" },
    { name: "Suresh Varma", role: "Technician" },
    { name: "Vijay Shah", role: "HOD" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ requestType: "", staffName: "" });

  const handleSave = () => {
    if (!formData.requestType || !formData.staffName) return;

    const staffInfo = staffList.find((s) => s.name === formData.staffName);
    const newMapping = {
      id: Date.now(),
      requestType: formData.requestType,
      staffName: formData.staffName,
      role: staffInfo?.role || "Staff",
      dept: "General",
    };

    setMappings([...mappings, newMapping]);
    setIsModalOpen(false);
    setFormData({ requestType: "", staffName: "" });
  };

  const deleteMapping = (id: number) => {
    if (confirm("Remove this mapping?")) {
      setMappings(mappings.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <UserCog className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Responsibility Mapping</h1>
          </div>
          <p className="text-muted-foreground">
            Link service request types to specific personnel
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Map Responsibility</DialogTitle>
              <DialogDescription>
                Assign a staff member to handle a specific request type.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Select Request Type</Label>
                <Select value={formData.requestType} onValueChange={(value) => setFormData({ ...formData, requestType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {requestTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Responsible Staff</Label>
                <Select value={formData.staffName} onValueChange={(value) => setFormData({ ...formData, staffName: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Staff Member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staffList.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name} ({s.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="mt-2 gap-2">
                <Save className="h-4 w-4" />
                Finalize Mapping
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Card */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search request type or staff..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Service Category</TableHead>
                <TableHead className="font-semibold">Assigned Staff</TableHead>
                <TableHead className="font-semibold">Role / Position</TableHead>
                <TableHead className="text-right font-semibold">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Link2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item.requestType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-xs font-semibold">
                          {item.staffName.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.staffName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteMapping(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
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