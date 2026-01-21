"use client";

import React, { useState } from "react";
import { Plus, UserCog, Search, ShieldCheck, User, Calendar, Edit, Trash2 } from "lucide-react";
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

export default function DeptPersonMapping() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mappings = [
    { id: 1, dept: "IT Support", name: "John Doe", role: "HOD", fromDate: "2023-01-01", active: true },
    { id: 2, dept: "IT Support", name: "Mike Ross", role: "Technician", fromDate: "2023-02-15", active: true },
    { id: 3, dept: "Electrical", name: "Sarah Connor", role: "HOD", fromDate: "2023-01-10", active: true },
    { id: 4, dept: "Maintenance", name: "James Wilson", role: "Technician", fromDate: "2023-03-20", active: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <UserCog className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Dept Person Mapping</h1>
          </div>
          <p className="text-muted-foreground">
            Assign staff to departments and designate HODs
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Map New Person
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Map Staff to Department</DialogTitle>
              <DialogDescription>
                Assign a staff member to a department and set their role.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Select Staff</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Member..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Mike Ross</SelectItem>
                    <SelectItem value="3">Sarah Connor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assign to Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT Support</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-primary/5 p-4">
                <input type="checkbox" id="isHOD" className="h-4 w-4 accent-primary" />
                <label htmlFor="isHOD" className="text-sm font-medium text-primary">
                  Designate as Head of Department (HOD)
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>To Date (Optional)</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1">Save Assignment</Button>
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
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="it">IT Support</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Mapping Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Staff Member</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Role Type</TableHead>
                <TableHead className="font-semibold">Since</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {item.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.dept}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.role === "HOD" ? (
                      <Badge className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                        <ShieldCheck className="h-3 w-3" />
                        HOD
                      </Badge>
                    ) : (
                      <Badge className="gap-1 bg-blue-100 text-blue-700 hover:bg-blue-100">
                        <User className="h-3 w-3" />
                        Technician
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{item.fromDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
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