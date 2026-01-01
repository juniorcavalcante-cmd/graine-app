import { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  Calendar,
  FileText,
  PiggyBank,
  ArrowLeftRight,
  Settings,
  User,
} from "lucide-react";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "lancamentos", label: "Lançamentos", icon: Receipt },
  { id: "calendario", label: "Calendário", icon: Calendar },
  { id: "resumos", label: "Resumos", icon: FileText },
  { id: "caixinhas", label: "Caixinhas", icon: PiggyBank },
  { id: "comparativos", label: "Comparativos", icon: ArrowLeftRight },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo size="md" />
          
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={isActive ? "nav-tab-active" : "nav-tab"}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg" alt="Usuário" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    US
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User size={16} className="mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} className="mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-expense">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border overflow-x-auto">
        <nav className="container flex items-center gap-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-shrink-0 ${isActive ? "nav-tab-active" : "nav-tab"}`}
              >
                <span className="flex items-center gap-1.5">
                  <Icon size={14} />
                  <span className="text-xs">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
