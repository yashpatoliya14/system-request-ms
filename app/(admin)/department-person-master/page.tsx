"use client";

import React, { useState } from "react";
import { Users2, Plus, Search, Mail, Phone, ShieldCheck, Wrench, Trash2, Edit2, Filter } from "lucide-react";
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

export default function DepartmentPersonMaster() {
  const [staff] = useState([
    { id: 1, name: "Vijay Shah", role: "HOD", dept: "IT Support", email: "vijay@company.com", phone: "+91 98765 43210" },
    { id: 2, name: "Rahul Sharma", role: "Technician", dept: "IT Support", email: "rahul@company.com", phone: "+91 98765 43211" },
    { id: 3, name: "Amit Patel", role: "HOD", dept: "Maintenance", email: "amit@company.com", phone: "+91 98765 43212" },
    { id: 4, name: "Suresh Varma", role: "Technician", dept: "Electrical", email: "suresh@company.com", phone: "+91 98765 43213" },
  ]);

  const colors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Users2 className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Personnel Master</h1>
          </div>
          <p className="text-muted-foreground">
            Manage staff, roles, and department assignments
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new personnel to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hod">HOD</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT Support</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+91 98765 43210" />
                </div>
              </div>
              <Button className="mt-2">Add Staff Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, email or department..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {staff.map((person, i) => (
          <Card key={person.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Gradient accent */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colors[i % colors.length]}`} />

            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-16 w-16 border-2 border-border">
                  <AvatarFallback className={`bg-gradient-to-br ${colors[i % colors.length]} text-white text-lg font-bold`}>
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{person.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        {person.role === "HOD" ? (
                          <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/10">
                            <ShieldCheck className="h-3 w-3" />
                            HOD
                          </Badge>
                        ) : (
                          <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            <Wrench className="h-3 w-3" />
                            Technician
                          </Badge>
                        )}
                        <Badge variant="secondary">{person.dept}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs truncate">{person.email}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">{person.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}