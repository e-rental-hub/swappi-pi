'use client';

import { useState } from "react";
import { Tabs } from "@/components/Tabs";
import { useRouter } from "next/navigation";
import Popup from "@/components/Popup";
import ExpressTrading from "@/components/Express";
import P2PTrading from "@/components/P2P";
import { TradeModeEnum } from "@/types/TradeModeEnum";

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

export default function Index() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Express");
  const [tradeMode, setTradeMode] = useState<TradeModeEnum>(TradeModeEnum.Buy);
  const [togglePopup, setTogglePopup] = useState<boolean>(false)
  
  return (
    <div>
      <div className="px-4 pt-4">
        {/* Tab Navigation */}
        <div className="mb-4">
          <Tabs 
            tabs={["Express", "P2P"]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>
        
        {/* Buy/Sell Toggle */}
        <div className="flex mb-4 bg-secondary rounded-full p-1 w-1/3">
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-medium ${tradeMode === "Buy" ? "bg-pi text-white" : ""}`}
            onClick={() => setTradeMode(TradeModeEnum.Buy)}
          >
            Buy
          </button>
          <button 
            className={`flex-1 py-2 rounded-full text-sm font-medium ${tradeMode === "Sell" ? "bg-red-500 text-white" : ""}`}
            onClick={() => setTradeMode(TradeModeEnum.Sell)}
          >
            Sell
          </button>
        </div>
        {activeTab==="Express" ? 
        <ExpressTrading tradeMode={tradeMode} /> : <P2PTrading tradeMode={tradeMode}  />
        
      }
      </div>
      <Popup header="Filter" toggle={togglePopup} setToggle={setTogglePopup} useMask={true}>
        <div>

        </div>
      </Popup>
    </div>
  );
}
