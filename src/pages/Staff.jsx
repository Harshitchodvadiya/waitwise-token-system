import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck, 
  Users, 
  Clock, 
  SkipForward, 
  CheckCircle, 
  BellRing, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  CalendarRange,
  BarChart,
  Ticket,
  UserPlus
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedCard from '@/components/ui-custom/AnimatedCard';

// Mock data
const initialQueue = [
  { id: 1, tokenNumber: 'A-101', customerName: 'John Smith', service: 'Account Opening', waitTime: '23 min', status: 'waiting' },
  { id: 2, tokenNumber: 'A-102', customerName: 'Sarah Johnson', service: 'Loan Inquiry', waitTime: '19 min', status: 'waiting' },
  { id: 3, tokenNumber: 'A-103', customerName: 'Michael Brown', service: 'Account Services', waitTime: '15 min', status: 'waiting' },
  { id: 4, tokenNumber: 'A-104', customerName: 'Emily Davis', service: 'Investment Consultation', waitTime: '10 min', status: 'waiting' },
  { id: 5, tokenNumber: 'A-105', customerName: 'David Wilson', service: 'Account Opening', waitTime: '5 min', status: 'waiting' },
];

const completedServicesData = [
  { id: 1, tokenNumber: 'A-093', customerName: 'Alice Thompson', service: 'Account Services', duration: '8 min', rating: 5 },
  { id: 2, tokenNumber: 'A-094', customerName: 'Robert Garcia', service: 'Loan Inquiry', duration: '15 min', rating: 4 },
  { id: 3, tokenNumber: 'A-095', customerName: 'Jennifer Martinez', service: 'Investment Consultation', duration: '22 min', rating: 5 },
  { id: 4, tokenNumber: 'A-096', customerName: 'Christopher Lee', service: 'Account Opening', duration: '12 min', rating: 3 },
  { id: 5, tokenNumber: 'A-097', customerName: 'Jessica White', service: 'Account Services', duration: '6 min', rating: 4 },
];

const skippedTokensData = [
  { id: 1, tokenNumber: 'A-098', customerName: 'Kevin Anderson', service: 'Account Opening', skippedAt: '10:15 AM' },
  { id: 2, tokenNumber: 'A-099', customerName: 'Patricia Moore', service: 'Loan Inquiry', skippedAt: '11:30 AM' },
];

const Staff = () => {
  const { toast } = useToast();
  const [queue, setQueue] = useState(initialQueue);
  const [completedServices, setCompletedServices] = useState(completedServicesData);
  const [skippedTokens, setSkippedTokens] = useState(skippedTokensData);
  const [currentToken, setCurrentToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  
  const handleCallNext = () => {
    if (queue.length === 0) {
      toast({
        title: 'Queue Empty',
        description: 'There are no customers waiting in the queue.',
        variant: 'default',
      });
      return;
    }
    
    // If already serving a customer, complete that service first
    if (currentToken) {
      handleCompleteService();
    }
    
    // Call the next customer
    const nextCustomer = queue[0];
    setCurrentToken(nextCustomer);
    setQueue(queue.slice(1));
    
    toast({
      title: 'Customer Called',
      description: `Now serving token ${nextCustomer.tokenNumber} - ${nextCustomer.customerName}`,
      variant: 'default',
    });
  };
  
  const handleSkipCustomer = () => {
    if (!currentToken) {
      toast({
        title: 'No Active Customer',
        description: 'There is no customer currently being served.',
        variant: 'default',
      });
      return;
    }
    
    // Add to skipped tokens
    setSkippedTokens([
      {
        id: currentToken.id,
        tokenNumber: currentToken.tokenNumber,
        customerName: currentToken.customerName,
        service: currentToken.service,
        skippedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...skippedTokens
    ]);
    
    // Clear current token
    setCurrentToken(null);
    
    toast({
      title: 'Customer Skipped',
      description: 'The customer has been moved to the skipped list.',
      variant: 'default',
    });
  };
  
  const handleCompleteService = () => {
    if (!currentToken) {
      toast({
        title: 'No Active Customer',
        description: 'There is no customer currently being served.',
        variant: 'default',
      });
      return;
    }
    
    // Add to completed services
    setCompletedServices([
      {
        id: currentToken.id,
        tokenNumber: currentToken.tokenNumber,
        customerName: currentToken.customerName,
        service: currentToken.service,
        duration: `${Math.floor(5 + Math.random() * 20)} min`,
        rating: Math.floor(3 + Math.random() * 3)
      },
      ...completedServices
    ]);
    
    // Clear current token
    setCurrentToken(null);
    
    toast({
      title: 'Service Completed',
      description: 'The service has been marked as completed.',
      variant: 'default',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Staff Portal</h1>
              <p className="text-muted-foreground mt-1">Manage customer queue and service delivery</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1.5">
                <CalendarRange className="h-4 w-4" />
                {selectedDate}
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="outline" size="sm" className="gap-1.5">
                <Users className="h-4 w-4" />
                Banking Services
              </Button>
              
              <Button size="sm" className="gap-1.5">
                <UserCheck className="h-4 w-4" />
                Online
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {currentToken ? (
                <AnimatedCard className="border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="px-3 py-1 bg-primary text-primary-foreground" variant="default">
                      Now Serving
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Started {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">{currentToken.tokenNumber}</h2>
                      <p className="text-muted-foreground">{currentToken.customerName}</p>
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="text-sm bg-blue-50 text-blue-700 border-blue-100">
                        {currentToken.service}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <Button className="gap-1.5" onClick={handleCompleteService}>
                      <CheckCircle className="h-4 w-4" />
                      Complete Service
                    </Button>
                    
                    <Button variant="outline" className="gap-1.5" onClick={handleSkipCustomer}>
                      <SkipForward className="h-4 w-4" />
                      Skip Customer
                    </Button>
                    
                    <Button variant="ghost" className="gap-1.5">
                      <BellRing className="h-4 w-4" />
                      Call Again
                    </Button>
                  </div>
                </AnimatedCard>
              ) : (
                <AnimatedCard>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <UserCheck className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <h2 className="text-xl font-medium mb-2">No Customer Currently Being Served</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Click the "Call Next Customer" button to serve the next person in the queue.
                    </p>
                    <Button className="gap-2" onClick={handleCallNext}>
                      <UserCheck className="h-4 w-4" />
                      Call Next Customer
                    </Button>
                  </div>
                </AnimatedCard>
              )}
              
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 bg-muted/30 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Customer Queue</h2>
                    <Badge variant="outline" className="bg-background">
                      {queue.length} Waiting
                    </Badge>
                  </div>
                </div>
                
                {queue.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">The queue is empty. No customers are waiting.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {queue.map((customer, index) => (
                      <div key={customer.id} className="p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{customer.tokenNumber} - {customer.customerName}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-100">
                                  {customer.service}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {customer.waitTime}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() => {
                                // If we're already serving someone, complete that service
                                if (currentToken) {
                                  handleCompleteService();
                                }
                                // Remove this customer from queue and set as current
                                const updatedQueue = [...queue];
                                const customerToServe = updatedQueue.splice(index, 1)[0];
                                setQueue(updatedQueue);
                                setCurrentToken(customerToServe);
                                
                                toast({
                                  title: "Customer Called",
                                  description: `Now serving ${customerToServe.tokenNumber}`,
                                  variant: "default",
                                });
                              }}
                            >
                              <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="p-3 border-t bg-muted/30 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={!currentToken && queue.length === 0}
                    onClick={handleCallNext}
                  >
                    <UserCheck className="h-4 w-4 mr-1.5" />
                    Call Next
                  </Button>
                  
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm mx-2">Page 1 of 1</span>
                    <Button variant="ghost" size="icon" disabled>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Summary</CardTitle>
                  <CardDescription>Your service performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Total Served</div>
                      <div className="font-medium">{completedServices.length}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Average Service Time</div>
                      <div className="font-medium">12 min</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Skipped Tokens</div>
                      <div className="font-medium">{skippedTokens.length}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                      <div className="font-medium">4.3/5</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <BarChart className="h-4 w-4" />
                    View Detailed Stats
                  </Button>
                </CardFooter>
              </Card>
              
              <Tabs defaultValue="completed">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="skipped">Skipped</TabsTrigger>
                </TabsList>
                
                <TabsContent value="completed" className="mt-3">
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y max-h-[340px] overflow-auto">
                        {completedServices.map((item) => (
                          <div key={item.id} className="px-4 py-3 hover:bg-muted/10 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{item.tokenNumber}</p>
                                <p className="text-sm text-muted-foreground">{item.customerName}</p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                                {item.duration}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <p className="text-xs text-muted-foreground">{item.service}</p>
                              <div className="flex-1"></div>
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-3 h-3 rounded-full ${i < item.rating ? 'bg-amber-400' : 'bg-muted'}`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skipped" className="mt-3">
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm font-medium">Skipped Tokens</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y max-h-[340px] overflow-auto">
                        {skippedTokens.length === 0 ? (
                          <div className="px-4 py-8 text-center">
                            <p className="text-muted-foreground">No skipped tokens</p>
                          </div>
                        ) : (
                          skippedTokens.map((item) => (
                            <div key={item.id} className="px-4 py-3 hover:bg-muted/10 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{item.tokenNumber}</p>
                                  <p className="text-sm text-muted-foreground">{item.customerName}</p>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {item.skippedAt}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                <p className="text-xs text-muted-foreground">{item.service}</p>
                                <div className="flex-1"></div>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Add back to queue
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Staff;
