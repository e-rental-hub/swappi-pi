'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TradingRestrictions } from "@/components/ui/TradingRestrictions";

export default function TradeSettings() {
  const [useLastSettings, setUseLastSettings] = useState(false);
  const [restrictionsOpen, setRestrictionsOpen] = useState(false);
  const [restrictions, setRestrictions] = useState({
    paymentTime: "20 Minutes",
    rankLimit: "No Limit",
    registrationDays: "No Limit",
    specificCountry: "No Limit",
    tradeRange: "1-100",
    maxOrdersPerUser: "No Limit",
  });
  
  const handlePrevious = () => {
    window.history.back();
  };
  
  const handlePreviewPublish = () => {
    console.log("Preview and publish");
    // Navigate to next step or show preview
  };

  const handleSaveRestrictions = (newRestrictions: any) => {
    setRestrictions(newRestrictions);
  };

  return (
    <div 
    // title="Buy USDT"
    >
      <div className="p-4">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="progress-step">
            <div className="progress-dot active" />
            <span className="text-xs mt-1">1/3</span>
          </div>
          <div className="progress-line bg-pi" />
          <div className="progress-step">
            <div className="progress-dot active" />
            <span className="text-xs mt-1">2/3</span>
          </div>
          <div className="progress-line bg-pi" />
          <div className="progress-step">
            <div className="progress-dot active" />
            <span className="text-xs mt-1">3/3</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Settings</h2>
          <div className="flex items-center gap-2">
            <Checkbox 
              id="lastSettings" 
              checked={useLastSettings}
              onCheckedChange={(checked) => setUseLastSettings(!!checked)}
            />
            <label htmlFor="lastSettings" className="text-xs text-muted-foreground">Last settings</label>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div 
            className="option-card cursor-pointer" 
            onClick={() => setRestrictionsOpen(true)}
          >
            <div>
              <div className="text-sm font-medium">Transaction Settings</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Edit</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment Time</span>
              <span className="text-sm">{restrictions.paymentTime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Rank Limit</span>
              <span className="text-sm">{restrictions.rankLimit}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Registration Days</span>
              <span className="text-sm">{restrictions.registrationDays}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Specific country</span>
              <span className="text-sm">{restrictions.specificCountry}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">30 day trades</span>
              <span className="text-sm">{restrictions.tradeRange}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Max orders per user</span>
              <span className="text-sm">{restrictions.maxOrdersPerUser}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Completed orders</span>
              <span className="text-sm">No Limit</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Do Not Deal With Other Publishers</span>
              <span className="text-sm">Closed</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-medium">Terms of trade (Optional)</h3>
          <p className="text-xs text-muted-foreground">The counterparty can see the transaction terms you entered before the transaction</p>
          <Textarea 
            className="bg-card border-border h-24" 
            placeholder="Enter your transaction terms"
          />
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Auto-reply (Optional)</h3>
            <Button variant="ghost" size="sm" className="text-pi h-7">
              + Template
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">This message will be automatically sent after the order is created.</p>
          <Textarea 
            className="bg-card border-border h-24" 
            placeholder="Enter your auto-reply message"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button 
            className="flex-1 bg-pi hover:bg-pi/90"
            onClick={handlePreviewPublish}
          >
            Preview and Publish
          </Button>
        </div>
      </div>
      
      <TradingRestrictions 
        open={restrictionsOpen}
        onOpenChange={setRestrictionsOpen}
        onSave={handleSaveRestrictions}
      />
    </div>
  );
}
