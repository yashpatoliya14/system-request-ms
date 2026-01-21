"use client";

import React, { useState } from "react";
import { Settings2, Plus, Edit2, Trash2, Save, Clock } from "lucide-react";
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

export default function ServiceTypeMaster() {
  const [departments] = useState([
    { id: 1, name: "IT Support" },
    { id: 2, name: "Electrical" },
    { id: 3, name: "Maintenance" },
  ]);

  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, deptId: 1, name: "Hardware Repair", days: 2, status: "Active" },
    { id: 2, deptId: 1, name: "Software Installation", days: 1, status: "Active" },
    { id: 3, deptId: 2, name: "Wiring Issue", days: 3, status: "Active" },
    { id: 4, deptId: 3, name: "AC Maintenance", days: 2, status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    deptId: "",
    name: "",
    days: 1,
    status: "Active",
  });

  const handleSave = () => {
    if (!formData.deptId || !formData.name) {
      return;
    }

    if (editId !== null) {
      setServiceTypes(
        serviceTypes.map((st) =>
          st.id === editId
            ? { ...st, deptId: Number(formData.deptId), name: formData.name, days: formData.days, status: formData.status }
            : st
        )
      );
    } else {
      const newId = Math.max(0, ...serviceTypes.map((s) => s.id)) + 1;
      setServiceTypes([
        ...serviceTypes,
        {
          id: newId,
          deptId: Number(formData.deptId),
          name: formData.name,
          days: formData.days,
          status: formData.status,
        },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this service type?")) {
      setServiceTypes(serviceTypes.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (item: typeof serviceTypes[0]) => {
    setEditId(item.id);
    setFormData({
      deptId: item.deptId.toString(),
      name: item.name,
      days: item.days,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData({ deptId: "", name: "", days: 1, status: "Active" });
  };

  const getDeptName = (id: number) => departments.find((d) => d.id === id)?.name || "Unknown";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Settings2 className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Service Type Master</h1>
          </div>
          <p className="text-muted-foreground">
            Manage issue categories for each department
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Add New Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit" : "Add"} Service Type</DialogTitle>
              <DialogDescription>
                {editId ? "Update the service type details." : "Create a new service type for a department."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Select Department</Label>
                <Select value={formData.deptId} onValueChange={(value) => setFormData({ ...formData, deptId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Department..." />
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
                <Label>Service Type Name</Label>
                <Input
                  placeholder="e.g. Printer Issue"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Resolution Days (SLA)</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Save Type
                </Button>
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Settings2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Types</p>
              <p className="text-2xl font-bold">{serviceTypes.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg SLA</p>
              <p className="text-2xl font-bold">
                {(serviceTypes.reduce((acc, s) => acc + s.days, 0) / serviceTypes.length).toFixed(1)} Days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Service Type Name</TableHead>
                <TableHead className="font-semibold">SLA Days</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceTypes.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      {getDeptName(item.deptId)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.days} Days</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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