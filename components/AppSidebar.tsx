"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    UserCog,
    ListTree,
    Settings2,
    Fingerprint,
    Map,
    LogOut,
    Zap,
    Briefcase,
    History,
    Users,
    BarChart3,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
    name: string;
    icon: React.ReactNode;
    href: string;
}

interface SidebarProps {
    variant: "admin" | "portal" | "hod";
}

const sidebarConfigs = {
    admin: {
        title: "Admin",
        subtitle: "OS",
        icon: <Sparkles className="h-5 w-5" />,
        menuLabel: "Core Masters",
        items: [
            { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, href: "/admin-dashboard" },
            { name: "Departments", icon: <Building2 className="h-4 w-4" />, href: "/dept-master" },
            { name: "Personnel", icon: <UserCog className="h-4 w-4" />, href: "/dept-person" },
            { name: "Request Types", icon: <ListTree className="h-4 w-4" />, href: "/request-type" },
            { name: "Service Types", icon: <Settings2 className="h-4 w-4" />, href: "/service-type" },
            { name: "Status Master", icon: <Fingerprint className="h-4 w-4" />, href: "/status-master" },
            { name: "Type Mapping", icon: <Map className="h-4 w-4" />, href: "/type-mapping" },
            { name: "Request Mapping", icon: <Map className="h-4 w-4" />, href: "/request-mapping" },
            { name: "Person Master", icon: <Users className="h-4 w-4" />, href: "/department-person-master" },
        ],
    },
    portal: {
        title: "Service",
        subtitle: "OS",
        icon: <Zap className="h-5 w-5" />,
        menuLabel: "Navigation",
        items: [
            { name: "Operations Hub", icon: <Zap className="h-4 w-4" />, href: "/portal-dashboard" },
            { name: "Technician View", icon: <Briefcase className="h-4 w-4" />, href: "/technician" },
            { name: "Request Details", icon: <History className="h-4 w-4" />, href: "/request-details" },
        ],
    },
    hod: {
        title: "Dept",
        subtitle: "Manager",
        icon: <BarChart3 className="h-5 w-5" />,
        menuLabel: "Management",
        items: [
            { name: "Department Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, href: "/hod-dashboard" },
        ],
    },
};

export default function AppSidebar({ variant }: SidebarProps) {
    const pathname = usePathname();
    const config = sidebarConfigs[variant];

    const handleLogout = () => {
        document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
    };

    return (
        <TooltipProvider delayDuration={0}>
            <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                        {config.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                            {config.title}
                            <span className="ml-0.5 text-primary">{config.subtitle}</span>
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50">
                            Enterprise Portal
                        </span>
                    </div>
                </div>

                <Separator className="bg-sidebar-border" />

                {/* Navigation */}
                <ScrollArea className="flex-1 px-3 py-4">
                    <div className="mb-4 px-3">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                            {config.menuLabel}
                        </span>
                    </div>
                    <nav className="space-y-1">
                        {config.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                                                    isActive
                                                        ? "bg-primary-foreground/20"
                                                        : "bg-sidebar-accent group-hover:bg-sidebar-foreground/10"
                                                )}
                                            >
                                                {item.icon}
                                            </span>
                                            <span className="flex-1">{item.name}</span>
                                            {isActive && (
                                                <ChevronRight className="h-4 w-4 opacity-60" />
                                            )}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="font-medium">
                                        {item.name}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </nav>
                </ScrollArea>

                <Separator className="bg-sidebar-border" />

                {/* User Section */}
                <div className="p-4">
                    <div className="mb-3 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3">
                        <Avatar className="h-9 w-9 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                {variant === "admin" ? "SA" : variant === "hod" ? "HD" : "US"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-semibold text-sidebar-foreground">
                                {variant === "admin" ? "Super Admin" : variant === "hod" ? "Department Head" : "Portal User"}
                            </p>
                            <p className="truncate text-xs text-sidebar-foreground/50">
                                {variant}@service.com
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>
        </TooltipProvider>
    );
}
