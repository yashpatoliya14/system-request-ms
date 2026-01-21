"use client";

import React, { useState } from "react";
import { CheckSquare, Plus, Trash2, Edit3 } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StatusMaster() {
  const [statuses] = useState([
    { id: 1, name: "Pending", color: "bg-amber-500", description: "Initial state of request" },
    { id: 2, name: "In Progress", color: "bg-blue-500", description: "Technician is working" },
    { id: 3, name: "Completed", color: "bg-emerald-500", description: "Issue has been fixed" },
    { id: 4, name: "On Hold", color: "bg-orange-500", description: "Waiting for resources" },
    { id: 5, name: "Cancelled", color: "bg-rose-500", description: "Request was cancelled" },
  ]);

  const getStatusBadge = (name: string, color: string) => {
    const colorMap: Record<string, string> = {
      "bg-amber-500": "bg-amber-100 text-amber-700",
      "bg-blue-500": "bg-blue-100 text-blue-700",
      "bg-emerald-500": "bg-emerald-100 text-emerald-700",
      "bg-orange-500": "bg-orange-100 text-orange-700",
      "bg-rose-500": "bg-rose-100 text-rose-700",
    };
    return (
      <Badge className={`${colorMap[color] || "bg-gray-100 text-gray-700"} hover:${colorMap[color]}`}>
        {name}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Status Master</h1>
          </div>
          <p className="text-muted-foreground">
            Define workflow stages for service requests
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Add Status
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New Status</DialogTitle>
              <DialogDescription>
                Create a new status for the request workflow.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Status Name</Label>
                <Input placeholder="e.g., Under Review" />
              </div>
              <div className="space-y-2">
                <Label>Color Indicator</Label>
                <div className="flex gap-2">
                  {["bg-amber-500", "bg-blue-500", "bg-emerald-500", "bg-orange-500", "bg-rose-500", "bg-violet-500"].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full ${color} ring-2 ring-transparent hover:ring-offset-2 hover:ring-primary transition-all`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="Brief description of this status" />
              </div>
              <Button className="mt-2">Create Status</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Statuses</p>
              <p className="text-2xl font-bold">{statuses.length}</p>
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
                <TableHead className="font-semibold">Status Name</TableHead>
                <TableHead className="font-semibold">Indicator</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statuses.map((s) => (
                <TableRow key={s.id} className="group">
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${s.color}`} />
                      {getStatusBadge(s.name, s.color)}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.description}</TableCell>
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
    </div>
  );
}