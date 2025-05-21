'use client';

import { useState } from "react";
import { Tabs } from "@/components/Tabs";
import { TradeListItem } from "@/components/TradeListItem";

type OrderTab = "all" | "buy" | "sell";
type Order = {
  id: string;
  type: "Buy" | "Sell";
  amount: string;
  price: string;
  total: string;
  status: "Completed" | "Processing" | "Cancelled";
  date: string;
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderTab>("all");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      type: "Buy",
      amount: "10 PI",
      price: "₦1,620",
      total: "₦16,200",
      status: "Completed",
      date: "2023-05-10 14:30"
    },
    {
      id: "2",
      type: "Sell",
      amount: "5 PI",
      price: "₦1,600",
      total: "₦8,000",
      status: "Processing",
      date: "2023-05-09 09:15"
    },
    {
      id: "3",
      type: "Buy",
      amount: "20 PI",
      price: "₦1,590",
      total: "₦31,800",
      status: "Cancelled",
      date: "2023-05-08 11:45"
    },
    {
      id: "4",
      type: "Sell",
      amount: "8 PI",
      price: "₦1,610",
      total: "₦12,880",
      status: "Completed",
      date: "2023-05-07 16:20"
    }
  ]);

  const tabItems = [
    { id: "all", label: "All Orders" },
    { id: "buy", label: "Buy Orders" },
    { id: "sell", label: "Sell Orders" }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    if (activeTab === "buy") return order.type === "Buy";
    if (activeTab === "sell") return order.type === "Sell";
    return true;
  });

  return (
    <div>
      <div className="p-4">
        <Tabs 
          tabs={tabItems.map(tab => tab.label)} 
          activeTab={tabItems.find(tab => tab.id === activeTab)?.label || "All Orders"} 
          onChange={(tab) => {
            const selectedTab = tabItems.find(item => item.label === tab);
            if (selectedTab) {
              setActiveTab(selectedTab.id as OrderTab);
            }
          }} 
        />
        
        <div className="mt-4 space-y-4">
          {filteredOrders.map(order => (
            <TradeListItem 
              key={order.id}
              id={order.id}
              type={order.type}
              amount={order.amount}
              price={order.price}
              total={order.total}
              status={order.status}
              date={order.date}
            />
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
