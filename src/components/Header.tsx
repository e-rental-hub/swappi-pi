'use client';

import { ChevronLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
}

export function Header({ 
  title, 
  showBackButton = true,
  rightContent
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="sticky top-0 bg-background border-b border-border z-10">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button onClick={handleBack} className="p-2">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="font-medium">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {rightContent}
        </div>
      </div>
    </header>
  );
}
