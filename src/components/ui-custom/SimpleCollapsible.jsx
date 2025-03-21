
import React, { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

const SimpleCollapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-lg p-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2">
        <div className="rounded-md border p-4 text-sm">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SimpleCollapsible;
