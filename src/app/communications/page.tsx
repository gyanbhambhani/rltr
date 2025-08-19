"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle,
  Send,
  PhoneCall,
  Video,
  FileText,
  Star,
  MoreHorizontal
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock client data
const mockClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    status: "Active Buyer",
    lastContact: "2024-01-20",
    nextFollowUp: "2024-01-25",
    priority: "high",
    relationshipScore: 95,
    recentMessages: [
      { type: "email", content: "Property viewing scheduled for tomorrow", time: "2 hours ago", read: false },
      { type: "call", content: "Discussed offer strategy", time: "1 day ago", read: true }
    ],
    notes: "Interested in downtown properties, budget up to $500K",
    communicationPreferences: ["email", "text"],
    tags: ["VIP", "Downtown", "High Budget"]
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 234-5678",
    status: "Seller",
    lastContact: "2024-01-18",
    nextFollowUp: "2024-01-22",
    priority: "medium",
    relationshipScore: 87,
    recentMessages: [
      { type: "email", content: "Listing photos updated", time: "3 hours ago", read: true },
      { type: "call", content: "Market analysis discussion", time: "2 days ago", read: true }
    ],
    notes: "Selling family home, needs quick sale, flexible on price",
    communicationPreferences: ["call", "email"],
    tags: ["Seller", "Quick Sale", "Flexible"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "(555) 345-6789",
    status: "Prospect",
    lastContact: "2024-01-15",
    nextFollowUp: "2024-01-28",
    priority: "low",
    relationshipScore: 62,
    recentMessages: [
      { type: "email", content: "Sent market report", time: "1 week ago", read: true },
      { type: "call", content: "Initial consultation", time: "2 weeks ago", read: true }
    ],
    notes: "First-time buyer, learning about the process, not ready to commit yet",
    communicationPreferences: ["email"],
    tags: ["First-time Buyer", "Learning", "Long-term"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active Buyer": return "bg-blue-100 text-blue-800";
    case "Seller": return "bg-green-100 text-green-800";
    case "Prospect": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getRelationshipColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

export default function CommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const [activeTab, setActiveTab] = useState("conversations");

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Client Communications</h1>
          <p className="text-slate-600 mt-2">Build and maintain strong client relationships</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All Clients
            </Button>
            <Button
              variant={filterStatus === "active buyer" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active buyer")}
            >
              Active Buyers
            </Button>
            <Button
              variant={filterStatus === "seller" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("seller")}
            >
              Sellers
            </Button>
            <Button
              variant={filterStatus === "prospect" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("prospect")}
            >
              Prospects
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("conversations")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "conversations"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Conversations
            </button>
            <button
              onClick={() => setActiveTab("relationships")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "relationships"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Relationship Health
            </button>
            <button
              onClick={() => setActiveTab("followups")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "followups"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Follow-ups
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "conversations" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(client.priority)}>
                            {client.priority} priority
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <Mail className="h-4 w-4 mr-1" />
                          {client.email}
                        </div>
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <Phone className="h-4 w-4 mr-1" />
                          {client.phone}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getRelationshipColor(client.relationshipScore)}`}>
                          {client.relationshipScore}%
                        </div>
                        <div className="text-xs text-slate-500">Relationship</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Recent Messages */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Activity</h4>
                        <div className="space-y-2">
                          {client.recentMessages.slice(0, 2).map((message, msgIndex) => (
                            <div key={msgIndex} className="flex items-start gap-2 text-sm">
                              {message.type === "email" ? (
                                <Mail className={`h-3 w-3 ${message.read ? 'text-blue-600' : 'text-blue-800'} mt-0.5 flex-shrink-0`} />
                              ) : (
                                <Phone className={`h-3 w-3 ${message.read ? 'text-green-600' : 'text-green-800'} mt-0.5 flex-shrink-0`} />
                              )}
                              <div className="flex-1">
                                <p className={`${message.read ? 'text-slate-700' : 'text-slate-900 font-medium'}`}>
                                  {message.content}
                                </p>
                                <p className="text-xs text-slate-500">{message.time}</p>
                              </div>
                              {!message.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {client.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Communication Actions */}
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-slate-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            Next: {new Date(client.nextFollowUp).toLocaleDateString()}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Video className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "relationships" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">12</div>
                    <div className="text-sm text-slate-600">Strong Relationships (90%+)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">15</div>
                    <div className="text-sm text-slate-600">Good Relationships (75-89%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-slate-600">Needs Attention (60-74%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "followups" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClients
                    .filter(client => new Date(client.nextFollowUp) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                    .map((client, index) => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-slate-600">{client.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-900">
                            {new Date(client.nextFollowUp).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            {Math.ceil((new Date(client.nextFollowUp).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </div>
                        </div>
                        <Button size="sm">Schedule</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Send Newsletter
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Schedule Follow-ups
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Export Client List
            </button>
            <button className="p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
