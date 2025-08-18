"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Clock, 
  FileText, 
  MessageSquare, 
  MapPin, 
  DollarSign,
  Bed,
  Bath,
  Square,
  User,
  Phone,
  Mail,
  Download,
  Eye
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock deal data
const mockDeal = {
  id: 1,
  clientName: "Lisa Thompson",
  clientEmail: "lisa.thompson@email.com",
  clientPhone: "(555) 123-4567",
  propertyAddress: "654 Maple Dr, Westside",
  propertyPrice: "$485,000",
  propertyBeds: 3,
  propertyBaths: 2,
  propertySqft: 1900,
  status: "Under Contract",
  offerDate: "2024-01-10",
  closingDate: "2024-02-15",
  commission: "$14,550",
};

const timeline = [
  {
    id: 1,
    title: "Offer Submitted",
    date: "2024-01-10",
    status: "completed",
    description: "Purchase offer submitted for $485,000",
  },
  {
    id: 2,
    title: "Offer Accepted",
    date: "2024-01-12",
    status: "completed",
    description: "Seller accepted the offer with minor contingencies",
  },
  {
    id: 3,
    title: "Inspection Scheduled",
    date: "2024-01-15",
    status: "completed",
    description: "Home inspection completed - minor issues found",
  },
  {
    id: 4,
    title: "Appraisal Ordered",
    date: "2024-01-20",
    status: "current",
    description: "Lender ordered appraisal - pending results",
  },
  {
    id: 5,
    title: "Final Walkthrough",
    date: "2024-02-10",
    status: "pending",
    description: "Final walkthrough scheduled with buyer",
  },
  {
    id: 6,
    title: "Closing",
    date: "2024-02-15",
    status: "pending",
    description: "Closing scheduled at title company",
  },
];

const tasks = [
  {
    id: 1,
    title: "Review inspection report",
    dueDate: "2024-01-18",
    completed: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Coordinate with lender",
    dueDate: "2024-01-22",
    completed: false,
    priority: "high",
  },
  {
    id: 3,
    title: "Schedule final walkthrough",
    dueDate: "2024-02-08",
    completed: false,
    priority: "medium",
  },
  {
    id: 4,
    title: "Prepare closing documents",
    dueDate: "2024-02-12",
    completed: false,
    priority: "high",
  },
];

const documents = [
  {
    id: 1,
    name: "Purchase Agreement",
    type: "PDF",
    size: "2.3 MB",
    date: "2024-01-10",
    url: "#",
  },
  {
    id: 2,
    name: "Inspection Report",
    type: "PDF",
    size: "5.1 MB",
    date: "2024-01-15",
    url: "#",
  },
  {
    id: 3,
    name: "Appraisal Report",
    type: "PDF",
    size: "3.8 MB",
    date: "2024-01-22",
    url: "#",
  },
  {
    id: 4,
    name: "Title Report",
    type: "PDF",
    size: "1.9 MB",
    date: "2024-01-25",
    url: "#",
  },
];

const messages = [
  {
    id: 1,
    type: "email",
    sender: "Lisa Thompson",
    content: "Hi John, I'm excited about the house! When can we schedule the inspection?",
    timestamp: "2024-01-11T10:30:00Z",
    direction: "inbound",
  },
  {
    id: 2,
    type: "email",
    sender: "John Doe",
    content: "Great news Lisa! I've scheduled the inspection for this Friday at 2 PM. The inspector will call you 30 minutes before arrival.",
    timestamp: "2024-01-11T14:15:00Z",
    direction: "outbound",
  },
  {
    id: 3,
    type: "telegram",
    sender: "Lisa Thompson",
    content: "Perfect! I'll be there. The inspection went well, just some minor issues that we can address.",
    timestamp: "2024-01-15T16:45:00Z",
    direction: "inbound",
  },
  {
    id: 4,
    type: "telegram",
    sender: "John Doe",
    content: "Excellent! I'll review the report and coordinate with the seller's agent to address those issues.",
    timestamp: "2024-01-15T17:20:00Z",
    direction: "outbound",
  },
];

export default function DealPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("timeline");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "current":
        return "text-blue-600 bg-blue-50";
      case "pending":
        return "text-slate-600 bg-slate-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Deal #{params.id}</h1>
              <p className="text-slate-600 mt-2">{mockDeal.propertyAddress}</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {mockDeal.status}
            </Badge>
          </div>
        </div>

        {/* Property and Client Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-bold text-blue-600">{mockDeal.propertyPrice}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {mockDeal.propertyBeds} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {mockDeal.propertyBaths} baths
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {mockDeal.propertySqft.toLocaleString()} sqft
                </div>
              </div>
              <p className="text-sm text-slate-600">{mockDeal.propertyAddress}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold text-slate-900">{mockDeal.clientName}</p>
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="h-4 w-4 mr-2" />
                {mockDeal.clientEmail}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-2" />
                {mockDeal.clientPhone}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Deal Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Offer Date:</span>
                <span className="font-medium">{new Date(mockDeal.offerDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Closing Date:</span>
                <span className="font-medium">{new Date(mockDeal.closingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Commission:</span>
                <span className="font-bold text-green-600">{mockDeal.commission}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        {item.status === "completed" ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : item.status === "current" ? (
                          <Clock className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tasks & Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <div>
                          <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-slate-900">{doc.name}</p>
                          <p className="text-sm text-slate-500">
                            {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md p-4 rounded-lg ${
                        message.direction === 'outbound' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{message.sender}</span>
                          <span className="text-xs opacity-75">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center mt-2">
                          {message.type === 'telegram' && (
                            <MessageSquare className="h-3 w-3 mr-1 opacity-75" />
                          )}
                          <span className="text-xs opacity-75 capitalize">{message.type}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
