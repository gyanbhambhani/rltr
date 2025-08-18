"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  MoreHorizontal
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock clients data
const mockClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    type: "Buyer",
    status: "Active",
    lastContact: "2024-01-15",
    properties: ["123 Main St, Downtown"],
    budget: "$400k - $500k",
    agent: "John Doe",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 234-5678",
    type: "Seller",
    status: "Active",
    lastContact: "2024-01-18",
    properties: ["456 Oak Ave, Suburbs"],
    budget: "$350k - $450k",
    agent: "John Doe",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "(555) 345-6789",
    type: "Buyer",
    status: "Active",
    lastContact: "2024-01-20",
    properties: ["789 Pine Rd, Midtown"],
    budget: "$500k - $600k",
    agent: "John Doe",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "(555) 456-7890",
    type: "Buyer",
    status: "Prospect",
    lastContact: "2024-01-22",
    properties: [],
    budget: "$400k - $450k",
    agent: "John Doe",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "(555) 567-8901",
    type: "Buyer",
    status: "Under Contract",
    lastContact: "2024-01-25",
    properties: ["654 Maple Dr, Westside"],
    budget: "$450k - $550k",
    agent: "John Doe",
  },
  {
    id: 6,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 678-9012",
    type: "Seller",
    status: "Under Contract",
    lastContact: "2024-01-28",
    properties: ["987 Cedar Ln, Eastside"],
    budget: "$500k - $600k",
    agent: "John Doe",
  },
  {
    id: 7,
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    phone: "(555) 789-0123",
    type: "Buyer",
    status: "Closed",
    lastContact: "2024-01-10",
    properties: ["147 Birch Way, Northside"],
    budget: "$400k - $450k",
    agent: "John Doe",
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Under Contract":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Buyer":
        return "bg-blue-100 text-blue-800";
      case "Seller":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Clients</h1>
              <p className="text-slate-600 mt-2">Manage your client relationships and communications</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search clients by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Under Contract">Under Contract</option>
                  <option value="Closed">Closed</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{client.name}</h3>
                        <p className="text-sm text-slate-500">{client.agent}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{client.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(client.type)}>
                        {client.type}
                      </Badge>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>

                    {client.properties.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Properties:</p>
                        {client.properties.map((property, propIndex) => (
                          <div key={propIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                            <MapPin className="h-4 w-4" />
                            <span>{property}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Budget:</span>
                        <span className="font-medium">{client.budget}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-slate-600">Last Contact:</span>
                        <span className="text-slate-500">
                          {new Date(client.lastContact).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-slate-600">No clients found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
