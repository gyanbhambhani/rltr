"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, ClipboardList, MessageCircle, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const workflows = [
  {
    id: "mls",
    title: "MLS Super Interface",
    description: "Manage listings, search properties, and access market data",
    icon: Database,
    href: "/mls",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconColor: "text-blue-600",
    stats: {
      activeListings: "24",
      newListings: "3",
      marketUpdates: "12"
    }
  },
  {
    id: "transactions",
    title: "Transaction Coordinator",
    description: "Track deals, manage paperwork, and coordinate closings",
    icon: ClipboardList,
    href: "/transactions",
    color: "bg-green-50 border-green-200 text-green-700",
    iconColor: "text-green-600",
    stats: {
      activeDeals: "8",
      pendingClosings: "3",
      documents: "15"
    }
  },
  {
    id: "communications",
    title: "Client Communications",
    description: "Manage client relationships, messages, and follow-ups",
    icon: MessageCircle,
    href: "/communications",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconColor: "text-purple-600",
    stats: {
      activeClients: "32",
      unreadMessages: "5",
      followUps: "8"
    }
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Choose your workflow to get started</p>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={workflow.href}>
                <Card className={`h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${workflow.color}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg bg-white ${workflow.iconColor}`}>
                        <workflow.icon className="h-8 w-8" />
                      </div>
                      <ArrowRight className="h-5 w-5 opacity-60" />
                    </div>
                    <CardTitle className="text-xl mt-4">{workflow.title}</CardTitle>
                    <p className="text-sm opacity-80 mt-2">{workflow.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                      {Object.entries(workflow.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-semibold">{value}</div>
                          <div className="text-xs opacity-70 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Add New Listing
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Create New Deal
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Send Client Update
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
