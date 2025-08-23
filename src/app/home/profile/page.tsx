'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Settings, 
  ChevronRight, 
  Share2, 
  UserCheck, 
  Lock, 
  ExternalLink 
} from "lucide-react";
import { Tabs } from "@/components/Tabs";
import { useState } from "react";
import { PaymentManagement } from "@/components/PaymentManagement";
import { Header } from "@/components/Header";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Trade");
  const [showPaymentManagement, setShowPaymentManagement] = useState(false);

  if (showPaymentManagement) {
    return (
      <div>
        <PaymentManagement onBack={() => setShowPaymentManagement(false)} />
      </div>
    );
  }
  
  return (
    <div>
      <div className="p-4">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl mr-3">
            A
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h2 className="text-xl font-medium">adisa39</h2>
            </div>
            <div className="text-xs text-muted-foreground">
              Signup Time: 2021/12/01 | Deposit: 0 USDT
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-pi mr-1"></span>
                <span className="text-xs">Email</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-pi mr-1"></span>
                <span className="text-xs">Phone</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-pi mr-1"></span>
                <span className="text-xs">Address verification</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-3 bg-card border-border">
            <div className="text-muted-foreground text-xs mb-1">Total Amount</div>
            <div className="flex items-baseline">
              <span className="text-lg font-bold">0</span>
              <span className="text-sm ml-1">NGN</span>
              <span className="text-pi ml-1">
                <Info size={14} />
              </span>
            </div>
          </Card>
          <Card className="p-3 bg-card border-border">
            <div className="text-muted-foreground text-xs mb-1">Total Trades</div>
            <div className="text-lg font-bold">104</div>
          </Card>
          <Card className="p-3 bg-card border-border">
            <div className="text-muted-foreground text-xs mb-1">Completion Rate</div>
            <div className="text-lg font-bold">0%</div>
          </Card>
          <Card className="p-3 bg-card border-border">
            <div className="text-muted-foreground text-xs mb-1">30 Days Trades</div>
            <div className="text-lg font-bold">0</div>
          </Card>
          <Card className="p-3 bg-card border-border col-span-2">
            <div className="text-muted-foreground text-xs mb-1">Average Time</div>
            <div className="text-lg font-bold">0 m</div>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">More info</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
        
        {/* Navigation Tabs */}
        <Tabs 
          tabs={["Trade", "Notifications", "Pi Deposit"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        {/* Profile Menu */}
        <div className="mt-4">
          <ProfileMenuItem 
            icon={<Settings size={18} />} 
            label="Payment Management"
            onClick={() => setShowPaymentManagement(true)}
          />
          <ProfileMenuItem 
            icon={<Settings size={18} />} 
            label="Settings"
          />
          <ProfileMenuItem 
            icon={<UserCheck size={18} />} 
            label="Follow/Block"
          />
          <ProfileMenuItem 
            icon={<Share2 size={18} />} 
            label="Shared Asset"
          />
          <ProfileMenuItem 
            icon={<Lock size={18} />} 
            label="Print Password"
          />
        </div>
      </div>
    </div>
  );
}

const Info = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const ProfileMenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <div 
    className="flex items-center justify-between p-4 border-t border-border cursor-pointer hover:bg-accent/50 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="mr-3 text-muted-foreground">{icon}</div>
      <span>{label}</span>
    </div>
    <ChevronRight size={18} className="text-muted-foreground" />
  </div>
);
