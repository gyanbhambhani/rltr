"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  FileText, 
  Mail, 
  MessageSquare, 
  Check, 
  X, 
  Download,
  Eye,
  Calendar,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Square,
  BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock preview data
const mockPreviews = [
  {
    id: 1,
    type: "comps",
    title: "Comparable Sales Report",
    description: "Generated comps for 123 Main St, Downtown",
    content: {
      address: "123 Main St, Downtown",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: 1800,
      comps: [
        { address: "125 Main St", price: "$445,000", sold: "2024-01-05" },
        { address: "127 Main St", price: "$460,000", sold: "2024-01-10" },
        { address: "129 Main St", price: "$438,000", sold: "2024-01-15" },
      ]
    },
    status: "pending"
  },
  {
    id: 2,
    type: "email",
    title: "Draft Email to Client",
    description: "Follow-up email for Lisa Thompson",
    content: {
      to: "lisa.thompson@email.com",
      subject: "Property Update - 654 Maple Dr",
      body: "Hi Lisa, I wanted to update you on the progress of your purchase at 654 Maple Dr. The inspection has been completed and everything looks great! The appraisal has been ordered and should be completed by next week. I'll keep you posted on any updates. Best regards, John"
    },
    status: "pending"
  },
  {
    id: 3,
    type: "offer",
    title: "Purchase Offer Draft",
    description: "Offer for 789 Pine Rd, Midtown",
    content: {
      address: "789 Pine Rd, Midtown",
      offerPrice: "$520,000",
      earnestMoney: "$10,000",
      closingDate: "2024-02-28",
      contingencies: ["Financing", "Inspection", "Appraisal"]
    },
    status: "pending"
  }
];

export default function ComposerPage() {
  const [input, setInput] = useState("");
  const [previews, setPreviews] = useState(mockPreviews);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would be an API call to generate content
    }, 2000);
  };

  const handleApprove = (id: number) => {
    setPreviews(prev => prev.map(p => 
      p.id === id ? { ...p, status: "approved" } : p
    ));
  };

  const handleReject = (id: number) => {
    setPreviews(prev => prev.filter(p => p.id !== id));
  };

  const renderPreviewContent = (preview: any) => {
    switch (preview.type) {
      case "comps":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Subject Property</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{preview.content.address}</p>
                  <p className="text-2xl font-bold text-blue-600">{preview.content.price}</p>
                </div>
                <div className="text-sm text-slate-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {preview.content.beds} beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {preview.content.baths} baths
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {preview.content.sqft.toLocaleString()} sqft
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Comparable Sales</h4>
              <div className="space-y-2">
                {preview.content.comps.map((comp: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{comp.address}</p>
                      <p className="text-xs text-slate-500">Sold: {new Date(comp.sold).toLocaleDateString()}</p>
                    </div>
                    <p className="font-bold text-green-600">{comp.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-slate-600">To:</span>
                  <p className="text-slate-900">{preview.content.to}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600">Subject:</span>
                  <p className="text-slate-900">{preview.content.subject}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <p className="text-slate-900 whitespace-pre-line">{preview.content.body}</p>
            </div>
          </div>
        );

      case "offer":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Offer Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Property</p>
                  <p className="font-medium">{preview.content.address}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Offer Price</p>
                  <p className="font-bold text-green-600">{preview.content.offerPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Earnest Money</p>
                  <p className="font-medium">{preview.content.earnestMoney}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Closing Date</p>
                  <p className="font-medium">{new Date(preview.content.closingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Contingencies</h4>
              <div className="flex flex-wrap gap-2">
                {preview.content.contingencies.map((cont: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {cont}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <p>Preview content not available</p>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comps":
        return <BarChart3 className="h-5 w-5" />;
      case "email":
        return <Mail className="h-5 w-5" />;
      case "offer":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">RLTR Composer</h1>
          <p className="text-slate-600 mt-2">Tell RLTR what you want to do, and it will help you create it</p>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Type what you want RLTR to do..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-16 text-lg pl-4 pr-12"
                  disabled={isGenerating}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isGenerating}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0"
                >
                  {isGenerating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-slate-600"
                >
                  RLTR is working on your request...
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Preview Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Generated Content</h2>
          
          <AnimatePresence>
            {previews.map((preview, index) => (
              <motion.div
                key={preview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-2 ${
                  preview.status === "approved" ? "border-green-200 bg-green-50" : "border-slate-200"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getTypeIcon(preview.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{preview.title}</CardTitle>
                          <p className="text-sm text-slate-600">{preview.description}</p>
                        </div>
                      </div>
                      
                      {preview.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(preview.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(preview.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                      
                      {preview.status === "approved" && (
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
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {renderPreviewContent(preview)}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {previews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-slate-400 mb-4">
                <Send className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-slate-600">No generated content yet. Try asking RLTR to help you with something!</p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
