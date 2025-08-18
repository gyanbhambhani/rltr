"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Bed, Bath, Square, Calendar, Send, Eye, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock property data
const mockProperties = [
  {
    id: 1,
    address: "123 Main St, Downtown",
    price: "$450,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    dom: 12,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    features: ["Garage", "Pool", "Updated Kitchen"],
  },
  {
    id: 2,
    address: "456 Oak Ave, Suburbs",
    price: "$380,000",
    beds: 2,
    baths: 1,
    sqft: 1200,
    dom: 8,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    features: ["Fenced Yard", "New Roof"],
  },
  {
    id: 3,
    address: "789 Pine Rd, Midtown",
    price: "$520,000",
    beds: 4,
    baths: 3,
    sqft: 2200,
    dom: 15,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    features: ["Master Suite", "Fireplace", "Hardwood Floors"],
  },
  {
    id: 4,
    address: "321 Elm St, Uptown",
    price: "$410,000",
    beds: 3,
    baths: 2,
    sqft: 1600,
    dom: 5,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    features: ["Basement", "Central AC"],
  },
  {
    id: 5,
    address: "654 Maple Dr, Westside",
    price: "$485,000",
    beds: 3,
    baths: 2,
    sqft: 1900,
    dom: 22,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    features: ["Deck", "Updated Bathrooms"],
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    beds: "",
    baths: "",
    minPrice: "",
    maxPrice: "",
    minSqft: "",
    maxSqft: "",
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">MLS Super Search</h1>
          <p className="text-slate-600 mt-2">Find the perfect properties for your clients</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Type your search query... (e.g., '3 bed 2 bath homes under $500k in downtown')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Bedrooms</label>
                  <select
                    value={filters.beds}
                    onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Bathrooms</label>
                  <select
                    value={filters.baths}
                    onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Price Range</label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Square Feet</label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Min Sqft"
                      value={filters.minSqft}
                      onChange={(e) => setFilters({ ...filters, minSqft: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Max Sqft"
                      value={filters.maxSqft}
                      onChange={(e) => setFilters({ ...filters, maxSqft: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Search Results</CardTitle>
                  <Badge variant="secondary">{mockProperties.length} properties found</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            {/* Property Image */}
                            <div className="w-32 h-24 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={property.image}
                                alt={property.address}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Property Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-slate-900">{property.address}</h3>
                                  <p className="text-2xl font-bold text-blue-600">{property.price}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {property.dom} DOM
                                </Badge>
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                                <div className="flex items-center">
                                  <Bed className="h-4 w-4 mr-1" />
                                  {property.beds} beds
                                </div>
                                <div className="flex items-center">
                                  <Bath className="h-4 w-4 mr-1" />
                                  {property.baths} baths
                                </div>
                                <div className="flex items-center">
                                  <Square className="h-4 w-4 mr-1" />
                                  {property.sqft.toLocaleString()} sqft
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {property.features.map((feature, featureIndex) => (
                                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <BarChart3 className="h-4 w-4 mr-1" />
                                    Generate Comps
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Send className="h-4 w-4 mr-1" />
                                    Send to Client
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
