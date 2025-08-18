"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Folder,
  Calendar,
  User,
  MoreHorizontal,
  File,
  Image,
  FileType
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock documents data
const mockDocuments = [
  {
    id: 1,
    name: "Purchase Agreement - 654 Maple Dr",
    type: "PDF",
    size: "2.3 MB",
    category: "Contracts",
    client: "Lisa Thompson",
    property: "654 Maple Dr, Westside",
    uploadDate: "2024-01-10",
    lastModified: "2024-01-10",
    status: "Active",
  },
  {
    id: 2,
    name: "Inspection Report - 654 Maple Dr",
    type: "PDF",
    size: "5.1 MB",
    category: "Inspections",
    client: "Lisa Thompson",
    property: "654 Maple Dr, Westside",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Appraisal Report - 654 Maple Dr",
    type: "PDF",
    size: "3.8 MB",
    category: "Appraisals",
    client: "Lisa Thompson",
    property: "654 Maple Dr, Westside",
    uploadDate: "2024-01-22",
    lastModified: "2024-01-22",
    status: "Active",
  },
  {
    id: 4,
    name: "Title Report - 654 Maple Dr",
    type: "PDF",
    size: "1.9 MB",
    category: "Title",
    client: "Lisa Thompson",
    property: "654 Maple Dr, Westside",
    uploadDate: "2024-01-25",
    lastModified: "2024-01-25",
    status: "Active",
  },
  {
    id: 5,
    name: "Property Photos - 123 Main St",
    type: "ZIP",
    size: "15.2 MB",
    category: "Photos",
    client: "Sarah Johnson",
    property: "123 Main St, Downtown",
    uploadDate: "2024-01-12",
    lastModified: "2024-01-12",
    status: "Active",
  },
  {
    id: 6,
    name: "MLS Listing - 456 Oak Ave",
    type: "PDF",
    size: "1.2 MB",
    category: "Listings",
    client: "Mike Chen",
    property: "456 Oak Ave, Suburbs",
    uploadDate: "2024-01-08",
    lastModified: "2024-01-08",
    status: "Active",
  },
  {
    id: 7,
    name: "Client Agreement - Emily Rodriguez",
    type: "PDF",
    size: "0.8 MB",
    category: "Contracts",
    client: "Emily Rodriguez",
    property: "789 Pine Rd, Midtown",
    uploadDate: "2024-01-20",
    lastModified: "2024-01-20",
    status: "Active",
  },
];

const categories = [
  "All",
  "Contracts",
  "Inspections",
  "Appraisals",
  "Title",
  "Photos",
  "Listings",
  "Marketing",
  "Financial",
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileType className="h-8 w-8 text-red-500" />;
      case "ZIP":
        return <Folder className="h-8 w-8 text-yellow-500" />;
      case "JPG":
      case "PNG":
        return <Image className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-slate-500" />;
    }
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Documents</h1>
              <p className="text-slate-600 mt-2">Manage all your real estate documents and files</p>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
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
                  placeholder="Search documents by name, client, or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-slate-300 rounded-md text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="flex border border-slate-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-slate-600"}`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-slate-600"}`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-900 text-sm truncate">{doc.name}</h3>
                          <p className="text-xs text-slate-500">{doc.type} • {formatFileSize(doc.size)}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <User className="h-3 w-3" />
                        <span className="truncate">{doc.client}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{doc.property}</span>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {doc.category}
                      </Badge>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredDocuments.map((doc, index) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <div className="text-sm font-medium text-slate-900">{doc.name}</div>
                              <div className="text-sm text-slate-500">{doc.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{doc.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{doc.property}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatFileSize(doc.size)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">
              <FileText className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-slate-600">No documents found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
