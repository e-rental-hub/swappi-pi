'use client';

import { Home, ShoppingBag, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };
  
  return (
    <div className="fixed bottom-0 w-full border-t border-border bg-background h-16 flex justify-around items-center px-2">
      <Link href="/" className={`bottom-tab ${isActive("/")}`}>
        <Home size={24} className="mb-1" />
        <span>Trade</span>
      </Link>
      
      <Link href="/home/orders" className={`bottom-tab ${isActive("/orders")}`}>
        <ShoppingBag size={24} className="mb-1" />
        <span>Orders</span>
      </Link>
      
      <Link href="/home/post-ad" className={`bottom-tab ${isActive("/post-ad")}`}>
        <PlusCircle size={24} className="mb-1" />
        <span>Ads</span>
      </Link>
      
      <Link href="/home/profile" className={`bottom-tab ${isActive("/profile")}`}>
        <User size={24} className="mb-1" />
        <span>Profile</span>
      </Link>
    </div>
  );
}
