"use client";

import React, { useState } from "react";
import { Plus, GitMerge, Search, User, Settings, Trash2, CheckCircle, ArrowRight } from "lucide-react";
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

export default function AutoAssignmentMaster() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mappingList = [
    { id: 1, requestType: "New Laptop Request", technician: "Rajesh Kumar", dept: "IT Support", active: true },
    { id: 2, requestType: "Email Password Reset", technician: "Suresh Mehta", dept: "IT Support", active: true },
    { id: 3, requestType: "A/C Repair", technician: "Amit Patel", dept: "Maintenance", active: false },
    { id: 4, requestType: "Network Issue", technician: "Vijay Shah", dept: "IT Support", active: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GitMerge className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Auto Assignment Master</h1>
          </div>
          <p className="text-muted-foreground">
            Link specific request types to dedicated technicians
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Create New Mapping
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Auto-Assignment</DialogTitle>
              <DialogDescription>
                Link a request type to a technician for automatic assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Select Request Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose request type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">New Laptop Request</SelectItem>
                    <SelectItem value="email">Email Issues</SelectItem>
                    <SelectItem value="network">Network Problem</SelectItem>
                    <SelectItem value="ac">A/C Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Technician</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose technician..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh">Rajesh Kumar (IT Support)</SelectItem>
                    <SelectItem value="suresh">Suresh Mehta (IT Support)</SelectItem>
                    <SelectItem value="amit">Amit Patel (Maintenance)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
                <input type="checkbox" id="isActive" defaultChecked className="h-4 w-4 accent-primary" />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Enable this mapping immediately
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1">Link Technician</Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by request type or staff..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Service Request Type</TableHead>
                <TableHead className="font-semibold text-center">Auto-Assign To</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappingList.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{item.requestType}</p>
                        <p className="text-xs text-muted-foreground">{item.dept}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {item.technician.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.technician}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.active ? (
                      <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        <CheckCircle className="h-3 w-3" />
                        Live
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
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