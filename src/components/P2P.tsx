'use client';

import { useState } from "react";
import { TradeListItem } from "@/components/TradeListItem";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Popup from "@/components/Popup";
import { TradeModeEnum } from "@/types/TradeModeEnum";
import { PaymentManagement } from "./PaymentManagement";

// Mock data for the trade list
const mockTrades = [
  {
    id: 1,
    merchant: "FLAWLESSEXCHANGE",
    price: "1,621.94",
    quantity: "377.46 PI",
    completionRate: "97%",
    avgTime: "9 min",
    isVerified: true,
  },
  {
    id: 2,
    merchant: "SUNbizee",
    price: "1,621.95",
    quantity: "124.19 PI",
    completionRate: "99%",
    avgTime: "15 min",
    isVerified: true,
  },
  {
    id: 3,
    merchant: "IKEXCHANGE",
    price: "1,622.50",
    quantity: "98.43 PI",
    completionRate: "83%",
    avgTime: "20 min",
    isVerified: true,
  },
  {
    id: 4,
    merchant: "PiTrader247",
    price: "1,623.00",
    quantity: "55.20 PI",
    completionRate: "91%",
    avgTime: "12 min",
    isVerified: false,
  },
];
interface P2PPropType {
  tradeMode: TradeModeEnum
}

export default function P2PTrading({ tradeMode }:P2PPropType) {
  const [togglePopup, setTogglePopup] = useState<boolean>(false)
  
  return (
    <div>
      <div className="px-4 pt-4">        
        {/* Currency and Filter Options */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CurrencySelector 
              currency="PI"
              tradeMode={tradeMode}
              icon={"π"}
            />
            <span className="mx-1">→</span>
            <CurrencySelector 
              currency="NGN"
              tradeMode={tradeMode}
              icon={"₦"}
            />
          </div>
          
          <Button variant="outline" size="icon" className="bg-card border-border">
            <Filter size={18} />
          </Button>
        </div>
        
        {/* Search Input */}
        <div className="mb-4">
          <Input placeholder="Search merchants..." className="input-dark" />
        </div>
        
        {/* Trade List */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Available Offers</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RefreshCcw size={16} className="mr-1" /> Refresh
            </Button>
          </div>
          
          {mockTrades.map((trade) => (
            <TradeListItem
              key={trade.id}
              merchant={trade.merchant}
              price={trade.price}
              quantity={trade.quantity}
              completionRate={trade.completionRate}
              avgTime={trade.avgTime}
              isVerified={trade.isVerified}
              tradeMode={tradeMode}
              onBuyClick={() => setTogglePopup(true)}
            />
          ))}
        </div>
      </div>
      <Popup header="Filter" toggle={togglePopup} setToggle={setTogglePopup} useMask={true}>
        <div>

        </div>
      </Popup>
    </div>
  );
}
