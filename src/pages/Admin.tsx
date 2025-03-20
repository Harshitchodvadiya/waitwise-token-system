
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedCard from '@/components/ui-custom/AnimatedCard';
import { 
  BarChart, 
  Users, 
  Settings, 
  Bell, 
  Clock, 
  Calendar, 
  CheckCircle, 
  UserPlus,
  Activity,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  UserCog,
  AlertCircle
} from 'lucide-react';

// Mock data
const servicesData = [
  { id: 'banking', name: 'Banking Services', prefix: 'A', tokens: 23, staffCount: 4, waitTime: '15 min', status: 'active' },
  { id: 'healthcare', name: 'Healthcare', prefix: 'B', tokens: 17, staffCount: 3, waitTime: '25 min', status: 'active' },
  { id: 'customerservice', name: 'Customer Service', prefix: 'C', tokens: 9, staffCount: 2, waitTime: '10 min', status: 'active' },
  { id: 'government', name: 'Government Services', prefix: 'D', tokens: 31, staffCount: 5, waitTime: '35 min', status: 'active' },
];

const staffData = [
  { id: 1, name: 'John Davis', role: 'Banking Specialist', service: 'Banking Services', status: 'online', tokensServed: 12, rating: 4.8 },
  { id: 2, name: 'Emma Wilson', role: 'Customer Service Rep', service: 'Customer Service', status: 'online', tokensServed: 8, rating: 4.5 },
  { id: 3, name: 'Michael Brown', role: 'Healthcare Advisor', service: 'Healthcare', status: 'offline', tokensServed: 0, rating: 4.9 },
  { id: 4, name: 'Sarah Johnson', role: 'Gov Services Specialist', service: 'Government Services', status: 'online', tokensServed: 15, rating: 4.7 },
  { id: 5, name: 'Robert Garcia', role: 'Banking Specialist', service: 'Banking Services', status: 'online', tokensServed: 10, rating: 4.6 },
  { id: 6, name: 'Jessica White', role: 'Healthcare Advisor', service: 'Healthcare', status: 'online', tokensServed: 9, rating: 4.3 },
];

// Mock analytics data
const weeklyData = [65, 59, 80, 81, 56, 55, 40];
const monthCompare = { current: 347, previous: 312 };
const waitTimeAverage = { current: 18, previous: 23 };
const satisfactionRate = { current: 92, previous: 87 };

const Admin = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState('all');
  const [timeframe, setTimeframe] = useState('today');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6 md:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage services, staff and system settings</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Calendar className="h-4 w-4" />
                May 15, 2023
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {servicesData.map(service => (
                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue placeholder="Today" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <AnimatedCard delay={0} className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Tokens</p>
                  <h3 className="text-2xl font-bold">{monthCompare.current}</h3>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Timer className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4" />
                <span>{Math.round((monthCompare.current - monthCompare.previous) / monthCompare.previous * 100)}% increase</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
            </AnimatedCard>
            
            <AnimatedCard delay={150} className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Wait Time</p>
                  <h3 className="text-2xl font-bold">{waitTimeAverage.current} min</h3>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-full">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <ArrowDownRight className="h-4 w-4" />
                <span>{Math.round((waitTimeAverage.previous - waitTimeAverage.current) / waitTimeAverage.previous * 100)}% decrease</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
            </AnimatedCard>
            
            <AnimatedCard delay={300} className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Staff Members</p>
                  <h3 className="text-2xl font-bold">{staffData.filter(s => s.status === 'online').length}/{staffData.length}</h3>
                </div>
                <div className="p-2 bg-violet-50 text-violet-600 rounded-full">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>2 services understaffed</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Consider adding more staff</p>
            </AnimatedCard>
            
            <AnimatedCard delay={450} className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Satisfaction Rate</p>
                  <h3 className="text-2xl font-bold">{satisfactionRate.current}%</h3>
                </div>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
                  <Star className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4" />
                <span>{satisfactionRate.current - satisfactionRate.previous}% increase</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
            </AnimatedCard>
          </div>
          
          <Tabs defaultValue="services" className="mb-8">
            <TabsList className="bg-background mb-6">
              <TabsTrigger value="services" className="gap-2">
                <Settings className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="staff" className="gap-2">
                <Users className="h-4 w-4" />
                Staff Members
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Active Services</h2>
                  <Button size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Prefix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Tokens</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Staff</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Wait Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {servicesData.map((service) => (
                        <tr key={service.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{service.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{service.prefix}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{service.tokens}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{service.staffCount} active</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{service.waitTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                              Active
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Staff Management</h2>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Staff Member
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tokens Served</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffData.map((staff) => (
                        <tr key={staff.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{staff.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{staff.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{staff.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant="outline" 
                              className={staff.status === 'online' 
                                ? 'bg-green-50 text-green-700 border-green-100' 
                                : 'bg-gray-50 text-gray-700 border-gray-100'
                              }
                            >
                              {staff.status === 'online' ? 'Online' : 'Offline'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{staff.tokensServed} today</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              {staff.rating}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedCard className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Wait Time Trends</h3>
                    <p className="text-sm text-muted-foreground">Average wait time by service</p>
                  </div>
                  
                  <div className="p-4 h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Activity className="h-16 w-16 mx-auto mb-4 opacity-20" />
                      <p>Interactive analytics chart would be displayed here</p>
                      <p className="text-sm">Showing wait time trends by service</p>
                    </div>
                  </div>
                </AnimatedCard>
                
                <AnimatedCard className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Service Volume</h3>
                    <p className="text-sm text-muted-foreground">Tokens issued by service category</p>
                  </div>
                  
                  <div className="p-4 h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
                      <p>Interactive bar chart would be displayed here</p>
                      <p className="text-sm">Showing token volume by service</p>
                    </div>
                  </div>
                </AnimatedCard>
                
                <AnimatedCard className="p-0 md:col-span-2">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Peak Hours Analysis</h3>
                    <p className="text-sm text-muted-foreground">Token distribution by hour of day</p>
                  </div>
                  
                  <div className="p-4 h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Clock className="h-16 w-16 mx-auto mb-4 opacity-20" />
                      <p>Interactive heatmap chart would be displayed here</p>
                      <p className="text-sm">Showing token volume by hour and day</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system settings and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Send email alerts to customers</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Send text messages to customers</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Send in-app notifications</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Operating Hours</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-sm text-muted-foreground">Set operating hours for services</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Holiday Schedule</p>
                          <p className="text-sm text-muted-foreground">Set holidays and special schedules</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Service Availability</p>
                          <p className="text-sm text-muted-foreground">Enable or disable services</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
