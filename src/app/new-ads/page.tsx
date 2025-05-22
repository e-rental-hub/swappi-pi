'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Info, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PostAd() {
  const { toast } = useToast();
  const [adType, setAdType] = useState("Sell");
  const [priceType, setPriceType] = useState("Fixed");
  const [step, setStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [selectedFiat, setSelectedFiat] = useState("NGN");
  
  const handleNextStep = () => {
    setStep(step + 1);
    toast({
      title: "Step saved",
      description: "Moving to the next step.",
      duration: 3000,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Advertisement Posted",
      description: "Your trade advertisement has been successfully created.",
      duration: 3000,
    });
  };
  
  return (
    <div 
    // title="Post New Ad"
    >
      <div className="p-4">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="progress-step">
            <div className="progress-dot active" />
            <span className="text-xs mt-1">1/3</span>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <div className="progress-dot" />
            <span className="text-xs mt-1">2/3</span>
          </div>
          <div className="progress-line" />
          <div className="progress-step">
            <div className="progress-dot" />
            <span className="text-xs mt-1">3/3</span>
          </div>
        </div>
        
        <h2 className="text-lg font-medium mb-4">Set price and quantity</h2>
        
        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button 
            className={`${adType === "Buy" ? "bg-secondary text-foreground" : "bg-background text-muted-foreground"} border border-border rounded-full`}
            onClick={() => setAdType("Buy")}
          >
            Buy
          </Button>
          <Button 
            className={`${adType === "Sell" ? "bg-action text-white" : "bg-background text-muted-foreground"} border border-border rounded-full`}
            onClick={() => setAdType("Sell")}
          >
            Sell
          </Button>
        </div>
        
        {/* Currency Selection */}
        <div className="space-y-4 mb-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-1 block">Currency</Label>
            <CurrencySelector 
              currency="USDT"
              icon={<div className="w-5 h-5 rounded-full bg-usdt text-white flex items-center justify-center text-xs">T</div>}
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-1 block">Fiat</Label>
            <CurrencySelector 
              currency="NGN"
              icon={<div className="w-5 h-5 rounded-full bg-naira text-white flex items-center justify-center text-xs">₦</div>}
            />
          </div>
        </div>
        
        {/* Price Type */}
        <div className="mb-4">
          <Label className="text-sm text-muted-foreground mb-1 block">Price Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className={`${priceType === "Fixed" ? "bg-secondary text-foreground" : "bg-background text-muted-foreground"} border border-border`}
              onClick={() => setPriceType("Fixed")}
            >
              Fixed
            </Button>
            <Button 
              className={`${priceType === "Floating" ? "bg-secondary text-foreground" : "bg-background text-muted-foreground"} border border-border`}
              onClick={() => setPriceType("Floating")}
            >
              Floating
            </Button>
          </div>
        </div>
        
        {/* Balance Information */}
        <div className="text-sm mb-3">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Current Balance:</span>
            <span>0 USDT</span>
            <Info size={14} className="text-muted-foreground ml-1" />
          </div>
        </div>
        
        {/* Reference Price Info */}
        <div className="bg-card rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Spot Reference Price:</span>
            <span>1,586.53 NGN</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs">
            <RadioGroup defaultValue="reference" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="reference" value="reference" />
                <Label htmlFor="reference" className="text-xs cursor-pointer">
                  Online order book
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Info size={12} />
            <span>The above prices are for reference only, please set the order price based on your personal situation.</span>
          </div>
        </div>
        
        {/* Price and Quantity Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="unitPrice" className="text-sm text-muted-foreground mb-1 block">Unit Price</Label>
              <div className="relative">
                <Input 
                  id="unitPrice" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NGN
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="quantity" className="text-sm text-muted-foreground mb-1 block">Quantity</Label>
              <div className="relative">
                <Input 
                  id="quantity" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-pi">All</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">USDT</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="totalAmount" className="text-sm text-muted-foreground mb-1 block">Total Amount</Label>
              <div className="relative">
                <Input 
                  id="totalAmount" 
                  placeholder="Please enter" 
                  className="input-dark pr-16" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NGN
                </div>
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleNextStep}
              className="w-full bg-pi hover:bg-pi/90 mt-4"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
