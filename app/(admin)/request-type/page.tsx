"use client";

import React, { useState } from "react";
import { Settings2, Plus, Search, Layers, ChevronRight, Trash2, Edit3, Lightbulb, Box } from "lucide-react";
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

export default function RequestTypeMaster() {
  const [requestTypes] = useState([
    { id: 1, category: "Technical", typeName: "Computer Issue", dept: "IT Support", priority: "High" },
    { id: 2, category: "Facility", typeName: "AC Repair", dept: "Maintenance", priority: "Medium" },
    { id: 3, category: "Administrative", typeName: "Stationary Request", dept: "Operations", priority: "Low" },
    { id: 4, category: "Technical", typeName: "Network Problem", dept: "IT Support", priority: "High" },
  ]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">High</Badge>;
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium</Badge>;
      default:
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Settings2 className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Request Type Master</h1>
          </div>
          <p className="text-muted-foreground">
            Define specific request categories and service types
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Add Request Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Request Type</DialogTitle>
              <DialogDescription>
                Create a new request type and link it to a department.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Request Type Name</Label>
                <Input placeholder="e.g., Printer Issue" />
              </div>
              <div className="space-y-2">
                <Label>Broad Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="facility">Facility</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Linked Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Support</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-2">Create Request Type</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <CardTitle>Defined Categories</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Filter types..." className="w-64 pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Request Type Name</TableHead>
                <TableHead className="font-semibold">Broad Category</TableHead>
                <TableHead className="font-semibold">Linked Department</TableHead>
                <TableHead className="font-semibold">Default Priority</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestTypes.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
                        <Box className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item.typeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">{item.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.dept}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
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

      {/* Info Banner */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-violet-600 text-primary-foreground">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h4 className="text-lg font-bold">Need more categories?</h4>
            <p className="text-primary-foreground/80 text-sm">
              You can map these types to specific personnel in the &apos;Request Mapping&apos; section.
            </p>
          </div>
          <ChevronRight className="h-8 w-8 opacity-30" />
        </CardContent>
      </Card>
    </div>
  );
}