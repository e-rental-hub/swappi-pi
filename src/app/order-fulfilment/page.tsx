'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";

export default function OrderFulfillment() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const handleMax = () => {
    setAmount("24,300,000");
  };
  
  const handleProceed = () => {
    console.log("Proceed with sell", { amount, paymentMethod });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title="Sell USDT" />
      
      <div className="flex-1 p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Unit Price</div>
            <div className="text-lg font-medium">1,620.00NGN</div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">By amount</span>
            <span className="text-sm text-muted-foreground">By Quantity</span>
          </div>
          
          <div className="relative mb-2">
            <Input
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-card border-border pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-muted-foreground">NGN</span>
              <span className="text-pi cursor-pointer" onClick={handleMax}>Max</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Limit: 24,300,000 - 64,600,000 NGN
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <span>Balance: 0.00 USDT</span>
            <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-xs cursor-pointer">
              <Info size={12} />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">You pay</span>
            <span>0 USDT</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Payment method</p>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="bg-card border-border w-full">
              <SelectValue placeholder="Choose payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="opay">OPay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-6">
          <p className="text-sm mb-2">Terms of trade</p>
          <p className="text-xs text-muted-foreground">
            For lower quantity kindly kindly click on my username
            to see ads where you can open with your quantity,
            payment is very fast.
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          By proceeding, I've read and agreed to the <Link href="#" className="text-pi underline">P2P Transaction Rules</Link>
        </div>
      </div>
      
      <div className="p-4">
        <Button
          className="w-full bg-action hover:opacity-90"
          onClick={handleProceed}
        >
          Sell USDT
        </Button>
      </div>
    </div>
  );
}
