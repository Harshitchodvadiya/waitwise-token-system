
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, UserCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TokenCard = ({
  tokenNumber,
  service,
  waitTime,
  position,
  status,
  onCancel,
  onReschedule,
  className
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'waiting': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'called': return 'bg-green-50 text-green-700 border-green-100';
      case 'skipped': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'waiting': return 'Waiting';
      case 'called': return 'Called - It\'s your turn!';
      case 'skipped': return 'Skipped - Please check in';
      case 'completed': return 'Completed';
      default: return 'Waiting';
    }
  };

  return (
    <Card className={cn(
      'overflow-hidden transition-all duration-300', 
      'border-0 shadow-lg hover:shadow-xl',
      'bg-white/90 backdrop-blur-sm',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-60" />

      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{service}</p>
            <h3 className="text-2xl font-bold tracking-tight">{tokenNumber}</h3>
          </div>
          <Badge variant="outline" className={cn("transition-colors", getStatusColor())}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative pb-6">
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{waitTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserCheck className="w-4 h-4" />
            <span className="text-sm">Position: {position}</span>
          </div>
        </div>

        {position <= 3 && status === 'waiting' && (
          <div className="flex items-center gap-2 mt-4 p-2 bg-amber-50 text-amber-700 rounded-md animate-pulse-subtle">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {position === 1 ? "You're next!" : `${position} customers ahead of you`}
            </span>
          </div>
        )}
      </CardContent>

      {(status === 'waiting' || status === 'skipped') && (
        <CardFooter className="relative flex gap-2 pt-0">
          {onReschedule && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5"
              onClick={onReschedule}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reschedule
            </Button>
          )}
          {onCancel && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onCancel}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TokenCard;
