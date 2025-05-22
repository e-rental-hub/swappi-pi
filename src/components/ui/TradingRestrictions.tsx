'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface TradingRestrictionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (restrictions: any) => void;
}

export function TradingRestrictions({ open, onOpenChange, onSave }: TradingRestrictionsProps) {
  const [paymentTime, setPaymentTime] = useState("20 Minutes");
  const [rankLimit, setRankLimit] = useState("No Limit");
  const [registrationDays, setRegistrationDays] = useState("No Limit");
  const [specificCountry, setSpecificCountry] = useState("No Limit");
  const [tradeMin, setTradeMin] = useState("1");
  const [tradeMax, setTradeMax] = useState("100");
  const [maxOrdersPerUser, setMaxOrdersPerUser] = useState("No Limit");
  
  const handleConfirm = () => {
    onSave({
      paymentTime,
      rankLimit,
      registrationDays,
      specificCountry,
      tradeRange: `${tradeMin}-${tradeMax}`,
      maxOrdersPerUser
    });
    onOpenChange(false);
  };
  
  const handleReset = () => {
    setPaymentTime("20 Minutes");
    setRankLimit("No Limit");
    setRegistrationDays("No Limit");
    setSpecificCountry("No Limit");
    setTradeMin("1");
    setTradeMax("100");
    setMaxOrdersPerUser("No Limit");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background border-border text-foreground p-0">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle>Trading Restrictions</DialogTitle>
            <DialogClose className="text-muted-foreground">
              <X size={18} />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Payment Time</p>
            <Select value={paymentTime} onValueChange={setPaymentTime}>
              <SelectTrigger className="bg-card border-border w-full">
                <SelectValue placeholder="Select payment time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15 Minutes">15 Minutes</SelectItem>
                <SelectItem value="20 Minutes">20 Minutes</SelectItem>
                <SelectItem value="30 Minutes">30 Minutes</SelectItem>
                <SelectItem value="45 Minutes">45 Minutes</SelectItem>
                <SelectItem value="60 Minutes">60 Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Rank Limit</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant={rankLimit === "No Limit" ? "secondary" : "outline"}
                onClick={() => setRankLimit("No Limit")}
                className="text-sm h-9"
              >
                No Limit
              </Button>
              <Button 
                variant={rankLimit === "≥VIP1" ? "secondary" : "outline"}
                onClick={() => setRankLimit("≥VIP1")}
                className="text-sm h-9"
              >
                ≥VIP1
              </Button>
              <Button 
                variant={rankLimit === "≥VIP3" ? "secondary" : "outline"}
                onClick={() => setRankLimit("≥VIP3")}
                className="text-sm h-9"
              >
                ≥VIP3
              </Button>
              <Button 
                variant={rankLimit === "≥VIP5" ? "secondary" : "outline"}
                onClick={() => setRankLimit("≥VIP5")}
                className="text-sm h-9"
              >
                ≥VIP5
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Registration Days</p>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant={registrationDays === "No Limit" ? "secondary" : "outline"}
                onClick={() => setRegistrationDays("No Limit")}
                className="text-sm h-9"
              >
                No Limit
              </Button>
              <Button 
                variant={registrationDays === "≥5 Days" ? "secondary" : "outline"}
                onClick={() => setRegistrationDays("≥5 Days")}
                className="text-sm h-9"
              >
                ≥5 Days
              </Button>
              <Button 
                variant={registrationDays === "≥30 Days" ? "secondary" : "outline"}
                onClick={() => setRegistrationDays("≥30 Days")}
                className="text-sm h-9"
              >
                ≥30 Days
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Specific country</p>
            <Select value={specificCountry} onValueChange={setSpecificCountry}>
              <SelectTrigger className="bg-card border-border w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Limit">No Limit</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">30 day trades</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-card border border-border px-2 py-1 rounded-md">
                <span className="text-sm mr-1">≥</span>
                <input 
                  type="text" 
                  className="bg-transparent border-none w-12 focus:outline-none text-sm"
                  value={tradeMin}
                  onChange={(e) => setTradeMin(e.target.value)}
                />
              </div>
              <span>-</span>
              <div className="flex items-center bg-card border border-border px-2 py-1 rounded-md">
                <input 
                  type="text" 
                  className="bg-transparent border-none w-12 focus:outline-none text-sm"
                  value={tradeMax}
                  onChange={(e) => setTradeMax(e.target.value)}
                />
                <span className="text-sm ml-1">%</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Max orders per user</p>
            <Select value={maxOrdersPerUser} onValueChange={setMaxOrdersPerUser}>
              <SelectTrigger className="bg-card border-border w-full">
                <SelectValue placeholder="Select max orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Limit">No Limit</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-3 p-4 mt-2 border-t border-border">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            className="flex-1 bg-white text-black hover:bg-white/90"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
