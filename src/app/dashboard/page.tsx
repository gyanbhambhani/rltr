"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, MapPin, User } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for deals
const mockDeals = {
  leads: [
    {
      id: 1,
      clientName: "Sarah Johnson",
      propertyAddress: "123 Main St, Downtown",
      status: "New Lead",
      nextDeadline: "2024-01-15",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: 1800,
    },
    {
      id: 2,
      clientName: "Mike Chen",
      propertyAddress: "456 Oak Ave, Suburbs",
      status: "Contacted",
      nextDeadline: "2024-01-18",
      price: "$380,000",
      beds: 2,
      baths: 1,
      sqft: 1200,
    },
  ],
  activeBuyers: [
    {
      id: 3,
      clientName: "Emily Rodriguez",
      propertyAddress: "789 Pine Rd, Midtown",
      status: "Pre-approved",
      nextDeadline: "2024-01-20",
      price: "$520,000",
      beds: 4,
      baths: 3,
      sqft: 2200,
    },
    {
      id: 4,
      clientName: "David Kim",
      propertyAddress: "321 Elm St, Uptown",
      status: "House Hunting",
      nextDeadline: "2024-01-22",
      price: "$410,000",
      beds: 3,
      baths: 2,
      sqft: 1600,
    },
  ],
  underContract: [
    {
      id: 5,
      clientName: "Lisa Thompson",
      propertyAddress: "654 Maple Dr, Westside",
      status: "Inspection",
      nextDeadline: "2024-01-25",
      price: "$485,000",
      beds: 3,
      baths: 2,
      sqft: 1900,
    },
    {
      id: 6,
      clientName: "Robert Wilson",
      propertyAddress: "987 Cedar Ln, Eastside",
      status: "Appraisal",
      nextDeadline: "2024-01-28",
      price: "$550,000",
      beds: 4,
      baths: 3,
      sqft: 2400,
    },
  ],
  closed: [
    {
      id: 7,
      clientName: "Jennifer Lee",
      propertyAddress: "147 Birch Way, Northside",
      status: "Closed",
      nextDeadline: "2024-01-10",
      price: "$420,000",
      beds: 3,
      baths: 2,
      sqft: 1700,
    },
  ],
};

const pipelineColumns = [
  { key: "leads", title: "Leads", color: "bg-blue-50 border-blue-200" },
  { key: "activeBuyers", title: "Active Buyers", color: "bg-yellow-50 border-yellow-200" },
  { key: "underContract", title: "Under Contract", color: "bg-orange-50 border-orange-200" },
  { key: "closed", title: "Closed", color: "bg-green-50 border-green-200" },
];

const stats = [
  { label: "Active Listings", value: "24", change: "+12%", changeType: "positive" },
  { label: "Pending Offers", value: "8", change: "+3", changeType: "positive" },
  { label: "Closed This Month", value: "15", change: "+25%", changeType: "positive" },
  { label: "Revenue", value: "$284K", change: "+18%", changeType: "positive" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, John. Here&apos;s your pipeline overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pipeline View */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Pipeline Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {pipelineColumns.map((column, columnIndex) => (
              <motion.div
                key={column.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: columnIndex * 0.1 }}
                className={`rounded-lg border-2 ${column.color} p-4`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {mockDeals[column.key as keyof typeof mockDeals]?.length || 0}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {mockDeals[column.key as keyof typeof mockDeals]?.map((deal, dealIndex) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (columnIndex * 0.1) + (dealIndex * 0.05) }}
                    >
                      <Card className="bg-white shadow-sm">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-slate-900 text-sm">{deal.clientName}</p>
                                <div className="flex items-center text-xs text-slate-500 mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {deal.propertyAddress}
                                </div>
                              </div>
                              <Badge 
                                variant={column.key === 'closed' ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {deal.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-slate-600">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {deal.price}
                              </div>
                              <div className="text-slate-500">
                                {deal.beds}bd, {deal.baths}ba
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="text-slate-500">
                                {deal.sqft.toLocaleString()} sqft
                              </div>
                              <div className="flex items-center text-slate-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(deal.nextDeadline).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "offer", message: "New offer received for 123 Main St", time: "2 min ago" },
                    { type: "closing", message: "Closing scheduled for 456 Oak Ave", time: "1 hour ago" },
                    { type: "listing", message: "New listing added: 789 Pine Rd", time: "3 hours ago" },
                    { type: "client", message: "Client inquiry for downtown properties", time: "5 hours ago" },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === "offer" ? "bg-blue-500" :
                        activity.type === "closing" ? "bg-green-500" :
                        activity.type === "listing" ? "bg-purple-500" : "bg-orange-500"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Add New Listing
                </button>
                <button className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  Generate Offer
                </button>
                <button className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  Add Client
                </button>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Market is hot!</p>
                  <p className="text-xs text-green-600 mt-1">Average days on market: 12 days</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Price trends</p>
                  <p className="text-xs text-blue-600 mt-1">Median price up 8% this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
