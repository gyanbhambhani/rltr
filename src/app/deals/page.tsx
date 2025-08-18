"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar, 
  User,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock deals data
const mockDeals = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    propertyAddress: "123 Main St, Downtown",
    status: "New Lead",
    price: "$450,000",
    offerDate: "2024-01-15",
    closingDate: null,
    commission: "$13,500",
    agent: "John Doe",
  },
  {
    id: 2,
    clientName: "Mike Chen",
    propertyAddress: "456 Oak Ave, Suburbs",
    status: "Contacted",
    price: "$380,000",
    offerDate: "2024-01-18",
    closingDate: null,
    commission: "$11,400",
    agent: "John Doe",
  },
  {
    id: 3,
    clientName: "Emily Rodriguez",
    propertyAddress: "789 Pine Rd, Midtown",
    status: "Pre-approved",
    price: "$520,000",
    offerDate: "2024-01-20",
    closingDate: null,
    commission: "$15,600",
    agent: "John Doe",
  },
  {
    id: 4,
    clientName: "David Kim",
    propertyAddress: "321 Elm St, Uptown",
    status: "House Hunting",
    price: "$410,000",
    offerDate: "2024-01-22",
    closingDate: null,
    commission: "$12,300",
    agent: "John Doe",
  },
  {
    id: 5,
    clientName: "Lisa Thompson",
    propertyAddress: "654 Maple Dr, Westside",
    status: "Under Contract",
    price: "$485,000",
    offerDate: "2024-01-10",
    closingDate: "2024-02-15",
    commission: "$14,550",
    agent: "John Doe",
  },
  {
    id: 6,
    clientName: "Robert Wilson",
    propertyAddress: "987 Cedar Ln, Eastside",
    status: "Under Contract",
    price: "$550,000",
    offerDate: "2024-01-08",
    closingDate: "2024-02-20",
    commission: "$16,500",
    agent: "John Doe",
  },
  {
    id: 7,
    clientName: "Jennifer Lee",
    propertyAddress: "147 Birch Way, Northside",
    status: "Closed",
    price: "$420,000",
    offerDate: "2023-12-15",
    closingDate: "2024-01-10",
    commission: "$12,600",
    agent: "John Doe",
  },
];

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New Lead":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Pre-approved":
        return "bg-purple-100 text-purple-800";
      case "House Hunting":
        return "bg-orange-100 text-orange-800";
      case "Under Contract":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Deals</h1>
          <p className="text-slate-600 mt-2">Manage all your real estate deals and transactions</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search deals by client name or property address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="New Lead">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Pre-approved">Pre-approved</option>
                  <option value="House Hunting">House Hunting</option>
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

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Deals</CardTitle>
              <Badge variant="secondary">{filteredDeals.length} deals</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Offer Date</TableHead>
                    <TableHead>Closing Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeals.map((deal, index) => (
                    <motion.tr
                      key={deal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {deal.clientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{deal.clientName}</p>
                            <p className="text-sm text-slate-500">{deal.agent}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{deal.propertyAddress}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(deal.status)}>
                          {deal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{deal.price}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">{deal.commission}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">
                            {new Date(deal.offerDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {deal.closingDate ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">
                              {new Date(deal.closingDate).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">TBD</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
