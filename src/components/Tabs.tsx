
import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex space-x-2 p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${tab === activeTab ? 'active' : 'inactive'}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
