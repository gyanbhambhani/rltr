"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Palette,
  Save,
  Camera
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@rltr.com",
    phone: "(555) 123-4567",
    license: "RE123456",
    company: "RLTR Real Estate",
    bio: "Experienced real estate agent specializing in residential properties in the downtown area.",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    dealUpdates: true,
    marketReports: true,
    clientMessages: true,
    systemUpdates: false,
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account preferences and settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="absolute -bottom-1 -right-1 h-8 w-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="text-slate-600">Real Estate Agent</p>
                    <Badge variant="outline" className="mt-1">Active</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">First Name</label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name</label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Phone</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">License Number</label>
                    <Input
                      value={profileData.license}
                      onChange={(e) => setProfileData({ ...profileData, license: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Company</label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Email Alerts</h3>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">SMS Alerts</h3>
                      <p className="text-sm text-slate-600">Receive notifications via text message</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.smsAlerts}
                      onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Deal Updates</h3>
                      <p className="text-sm text-slate-600">Get notified about deal progress</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.dealUpdates}
                      onChange={(e) => setNotifications({ ...notifications, dealUpdates: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Market Reports</h3>
                      <p className="text-sm text-slate-600">Receive weekly market analysis</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.marketReports}
                      onChange={(e) => setNotifications({ ...notifications, marketReports: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">Client Messages</h3>
                      <p className="text-sm text-slate-600">Notify when clients send messages</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.clientMessages}
                      onChange={(e) => setNotifications({ ...notifications, clientMessages: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">System Updates</h3>
                      <p className="text-sm text-slate-600">Receive system maintenance notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.systemUpdates}
                      onChange={(e) => setNotifications({ ...notifications, systemUpdates: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Input type="password" placeholder="Confirm New Password" />
                    </div>
                    <Button className="mt-3">Update Password</Button>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-600 mb-3">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-2">Active Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Current Session</p>
                          <p className="text-xs text-slate-500">Chrome on MacBook Pro • Active now</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Current</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900">Professional Plan</h3>
                      <p className="text-sm text-blue-700">$49/month • Next billing: Feb 15, 2024</p>
                    </div>
                    <Badge className="bg-blue-600">Active</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-slate-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Download Invoice</Button>
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance & Theme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 border-2 border-blue-500 rounded-lg bg-white">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-slate-200 rounded mx-auto mb-2"></div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-lg bg-slate-900">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-slate-700 rounded mx-auto mb-2"></div>
                        <span className="text-sm font-medium text-white">Dark</span>
                      </div>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded mx-auto mb-2"></div>
                        <span className="text-sm font-medium">Auto</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Sidebar</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded mr-2" />
                      <span className="text-sm">Collapse sidebar by default</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded mr-2" />
                      <span className="text-sm">Show navigation labels</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
