"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  HeadphonesIcon,
  ShieldCheck,
  BarChart3,
  Clock,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px] animate-float" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/4 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Service<span className="text-primary">OS</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild size="sm" className="gap-1.5 shadow-lg shadow-primary/20">
            <Link href="/signup">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Enterprise Service Management
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-[1.1] md:text-7xl lg:text-8xl max-w-5xl">
            Streamline Your{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-violet-400 bg-clip-text text-transparent">
              Service Requests
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            A modern, role-based service management platform that empowers teams
            to raise, track, assign, and resolve requests — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-13 px-8 text-base gap-2 shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
              <Link href="/login">
                Open Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base gap-2 border-border/60 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
            >
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "4x", label: "Faster Resolution" },
              { value: "100%", label: "Role-Based Security" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="text-primary">manage services</span>
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground text-lg">
              Built with modern tech to handle every aspect of service request
              lifecycle.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Role-Based Access",
                desc: "Dedicated dashboards for Admin, HOD, Users, and Technicians with granular permissions.",
                gradient: "from-violet-500 to-purple-600",
              },
              {
                icon: HeadphonesIcon,
                title: "Smart Request Routing",
                desc: "Automatically route requests to the right department and technician based on category.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                desc: "Monitor service metrics, resolution times, and team performance at a glance.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Clock,
                title: "SLA Tracking",
                desc: "Set and track SLA targets with automated escalations for overdue requests.",
                gradient: "from-orange-500 to-amber-500",
              },
              {
                icon: CheckCircle2,
                title: "Complete Lifecycle",
                desc: "From creation to resolution — track every status change with full audit trail.",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: Layers,
                title: "Modern Stack",
                desc: "Built with Next.js, Prisma, and shadcn/ui for a fast, beautiful experience.",
                gradient: "from-indigo-500 to-violet-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Gradient accent line */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-linear-to-r ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 md:pb-32">
          <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-12 md:p-16 text-center">
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight">
                Ready to transform your service management?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-muted-foreground text-lg">
                Sign in to your dashboard and start managing service requests
                efficiently today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-10 text-base gap-2 shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
                >
                  <Link href="/login">
                    Sign In Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-13 px-10 text-base border-primary/20 hover:bg-primary/5"
                >
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Tailwind CSS, and shadcn/ui — ServiceOS © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
