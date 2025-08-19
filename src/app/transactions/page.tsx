"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin,
  ChevronRight,
  Plus,
  Filter,
  Search
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    propertyAddress: "123 Main St, Downtown",
    status: "Under Contract",
    price: "$450,000",
    closingDate: "2024-02-15",
    daysUntilClosing: 12,
    currentStep: "Appraisal",
    timeline: [
      { step: "Offer Accepted", date: "2024-01-10", completed: true },
      { step: "Inspection", date: "2024-01-15", completed: true },
      { step: "Appraisal", date: "2024-01-20", completed: false, current: true },
      { step: "Title Search", date: "2024-01-25", completed: false },
      { step: "Final Walkthrough", date: "2024-02-10", completed: false },
      { step: "Closing", date: "2024-02-15", completed: false }
    ],
    documents: [
      { name: "Purchase Agreement", status: "completed" },
      { name: "Inspection Report", status: "completed" },
      { name: "Appraisal", status: "pending" },
      { name: "Title Search", status: "in-progress" }
    ],
    nextAction: "Schedule appraisal",
    priority: "high"
  },
  {
    id: 2,
    clientName: "Mike Chen",
    propertyAddress: "456 Oak Ave, Suburbs",
    status: "Inspection Period",
    price: "$380,000",
    closingDate: "2024-02-28",
    daysUntilClosing: 25,
    currentStep: "Inspection",
    timeline: [
      { step: "Offer Accepted", date: "2024-01-12", completed: true },
      { step: "Inspection", date: "2024-01-18", completed: false, current: true },
      { step: "Appraisal", date: "2024-01-25", completed: false },
      { step: "Title Search", date: "2024-02-01", completed: false },
      { step: "Final Walkthrough", date: "2024-02-20", completed: false },
      { step: "Closing", date: "2024-02-28", completed: false }
    ],
    documents: [
      { name: "Purchase Agreement", status: "completed" },
      { name: "Inspection Report", status: "in-progress" },
      { name: "Appraisal", status: "pending" },
      { name: "Title Search", status: "pending" }
    ],
    nextAction: "Complete inspection",
    priority: "medium"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Under Contract": return "bg-green-100 text-green-800";
    case "Inspection Period": return "bg-yellow-100 text-yellow-800";
    case "Appraisal Ordered": return "bg-blue-100 text-blue-800";
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

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null);

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || transaction.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Transaction Coordinator</h1>
          <p className="text-slate-600 mt-2">Manage deals through their complete lifecycle</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search transactions by client or property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All Deals
            </Button>
            <Button
              variant={filterStatus === "under contract" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("under contract")}
            >
              Under Contract
            </Button>
            <Button
              variant={filterStatus === "inspection" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("inspection")}
            >
              Inspection
            </Button>
            <Button
              variant={filterStatus === "appraisal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("appraisal")}
            >
              Appraisal
            </Button>
          </div>
        </div>

        {/* Transaction Timeline View */}
        <div className="space-y-6">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(transaction.priority)}>
                          {transaction.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {transaction.daysUntilClosing} days to close
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{transaction.clientName}</CardTitle>
                      <div className="flex items-center text-sm text-slate-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {transaction.propertyAddress}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{transaction.price}</div>
                      <div className="text-sm text-slate-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {new Date(transaction.closingDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Timeline Progress */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">Transaction Progress</h4>
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        {transaction.timeline.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex flex-col items-center relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step.completed 
                                ? "bg-green-500 text-white" 
                                : step.current 
                                ? "bg-blue-500 text-white"
                                : "bg-slate-200 text-slate-500"
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : step.current ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                stepIndex + 1
                              )}
                            </div>
                            <div className="text-xs text-slate-600 mt-2 text-center max-w-20">
                              {step.step}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {new Date(step.date).toLocaleDateString()}
                            </div>
                            {stepIndex < transaction.timeline.length - 1 && (
                              <div className={`absolute top-4 left-8 w-16 h-0.5 ${
                                step.completed ? "bg-green-500" : "bg-slate-200"
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Current Step and Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">Current Step: {transaction.currentStep}</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">Next Action Required:</p>
                        <p className="text-sm text-blue-700 mt-1">{transaction.nextAction}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">Document Status</h4>
                      <div className="space-y-2">
                        {transaction.documents.map((doc, docIndex) => (
                          <div key={docIndex} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{doc.name}</span>
                            <Badge 
                              variant={doc.status === "completed" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {doc.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Progress:</span> {transaction.timeline.filter(s => s.completed).length} of {transaction.timeline.length} steps completed
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Progress
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
