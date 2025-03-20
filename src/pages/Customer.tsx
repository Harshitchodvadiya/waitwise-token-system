
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Ticket, TicketCheck, Clock, RefreshCw, TicketX, History, BarChart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TokenCard from '@/components/ui-custom/TokenCard';
import AnimatedCard from '@/components/ui-custom/AnimatedCard';

// Mock data
const availableServices = [
  { id: 'banking', name: 'Banking Services', waitTime: '15 min', prefix: 'A' },
  { id: 'healthcare', name: 'Healthcare', waitTime: '25 min', prefix: 'B' },
  { id: 'customerservice', name: 'Customer Service', waitTime: '10 min', prefix: 'C' },
  { id: 'government', name: 'Government Services', waitTime: '35 min', prefix: 'D' },
];

const tokenHistory = [
  { id: 1, tokenNumber: 'A-089', service: 'Banking Services', date: '2023-06-15', status: 'completed', waitTime: '12 min' },
  { id: 2, tokenNumber: 'C-124', service: 'Customer Service', date: '2023-06-10', status: 'completed', waitTime: '18 min' },
  { id: 3, tokenNumber: 'B-045', service: 'Healthcare', date: '2023-05-28', status: 'cancelled', waitTime: 'N/A' },
];

const Customer = () => {
  const { toast } = useToast();
  const [activeTokens, setActiveTokens] = useState<any[]>([
    {
      id: 't1',
      tokenNumber: 'A-103',
      service: 'Banking Services',
      waitTime: '~15 min',
      position: 3,
      status: 'waiting'
    }
  ]);
  const [selectedService, setSelectedService] = useState('');
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  const handleRequestToken = () => {
    if (!selectedService) {
      toast({
        title: 'Please select a service',
        description: 'You need to select a service to request a token.',
        variant: 'destructive',
      });
      return;
    }

    const service = availableServices.find(s => s.id === selectedService);
    
    if (service) {
      const newToken = {
        id: `t${Date.now()}`,
        tokenNumber: `${service.prefix}-${Math.floor(100 + Math.random() * 900)}`,
        service: service.name,
        waitTime: service.waitTime,
        position: Math.floor(2 + Math.random() * 5),
        status: 'waiting'
      };
      
      setActiveTokens([...activeTokens, newToken]);
      
      toast({
        title: 'Token Created Successfully',
        description: `Your token ${newToken.tokenNumber} has been issued.`,
        variant: 'default',
      });
      
      setRequestDialogOpen(false);
      setSelectedService('');
    }
  };

  const handleCancelToken = (tokenId: string) => {
    setActiveTokens(activeTokens.filter(token => token.id !== tokenId));
    
    toast({
      title: 'Token Cancelled',
      description: 'Your token has been cancelled successfully.',
      variant: 'default',
    });
  };

  const handleRescheduleToken = (tokenId: string) => {
    setActiveTokens(activeTokens.map(token => {
      if (token.id === tokenId) {
        // Simulate rescheduling by adding positions
        const newPosition = token.position + 2;
        const newWaitTime = `~${Math.ceil(newPosition * 5)} min`;
        return { ...token, position: newPosition, waitTime: newWaitTime };
      }
      return token;
    }));
    
    toast({
      title: 'Token Rescheduled',
      description: 'Your token has been moved back in the queue.',
      variant: 'default',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customer Portal</h1>
              <p className="text-muted-foreground mt-1">Manage your tokens and track your place in line</p>
            </div>
            
            <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Ticket className="h-4 w-4" />
                  Request New Token
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request a Token</DialogTitle>
                  <DialogDescription>
                    Select the service you need assistance with to join the virtual queue.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Select onValueChange={setSelectedService} value={selectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableServices.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - Est. wait: {service.waitTime}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRequestToken}>
                    <Ticket className="mr-2 h-4 w-4" />
                    Get Token
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="active" className="gap-2">
                <TicketCheck className="h-4 w-4" />
                Active Tokens
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                Token History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0">
              {activeTokens.length === 0 ? (
                <AnimatedCard className="text-center py-16">
                  <div className="max-w-sm mx-auto">
                    <Ticket className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Active Tokens</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any active tokens in the queue. Request a new token to get started.
                    </p>
                    <Button onClick={() => setRequestDialogOpen(true)}>
                      Request a Token
                    </Button>
                  </div>
                </AnimatedCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeTokens.map((token, index) => (
                    <TokenCard 
                      key={token.id}
                      tokenNumber={token.tokenNumber}
                      service={token.service}
                      waitTime={token.waitTime}
                      position={token.position}
                      status={token.status}
                      onCancel={() => handleCancelToken(token.id)}
                      onReschedule={() => handleRescheduleToken(token.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Token</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Wait Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tokenHistory.map((token) => (
                        <tr key={token.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{token.tokenNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{token.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{token.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{token.waitTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant="outline"
                              className={
                                token.status === 'completed' 
                                  ? 'bg-green-50 text-green-700 border-green-100' 
                                  : 'bg-amber-50 text-amber-700 border-amber-100'
                              }
                            >
                              {token.status === 'completed' ? 'Completed' : 'Cancelled'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Current Wait Times</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableServices.map((service) => (
                <Card key={service.id} className="hover-lift">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-medium">{service.waitTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estimated wait time
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedService(service.id);
                        setRequestDialogOpen(true);
                      }}
                    >
                      <Ticket className="mr-2 h-4 w-4" />
                      Request Token
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Customer;
