import {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Briefcase,
  Heart,
  Gamepad2,
  GraduationCap,
  Zap,
  Smartphone,
  Shirt,
  Plane,
  Gift,
  DollarSign,
  LucideIcon,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export const defaultCategories: Category[] = [
  { id: "1", name: "Alimentação", icon: "Utensils", color: "hsl(25, 90%, 55%)", isActive: true },
  { id: "2", name: "Transporte", icon: "Car", color: "hsl(210, 80%, 55%)", isActive: true },
  { id: "3", name: "Moradia", icon: "Home", color: "hsl(165, 60%, 45%)", isActive: true },
  { id: "4", name: "Saúde", icon: "Heart", color: "hsl(340, 75%, 55%)", isActive: true },
  { id: "5", name: "Lazer", icon: "Gamepad2", color: "hsl(280, 65%, 55%)", isActive: true },
  { id: "6", name: "Educação", icon: "GraduationCap", color: "hsl(45, 85%, 50%)", isActive: true },
  { id: "7", name: "Compras", icon: "ShoppingCart", color: "hsl(320, 70%, 50%)", isActive: true },
  { id: "8", name: "Receita", icon: "Briefcase", color: "hsl(155, 60%, 40%)", isActive: true },
  { id: "9", name: "Contas", icon: "Zap", color: "hsl(200, 70%, 50%)", isActive: true },
  { id: "10", name: "Tecnologia", icon: "Smartphone", color: "hsl(230, 70%, 55%)", isActive: true },
  { id: "11", name: "Vestuário", icon: "Shirt", color: "hsl(350, 65%, 50%)", isActive: true },
  { id: "12", name: "Viagens", icon: "Plane", color: "hsl(180, 60%, 45%)", isActive: true },
  { id: "13", name: "Presentes", icon: "Gift", color: "hsl(300, 60%, 50%)", isActive: true },
  { id: "14", name: "Outros", icon: "DollarSign", color: "hsl(0, 0%, 50%)", isActive: true },
];

export const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Briefcase,
  Heart,
  Gamepad2,
  GraduationCap,
  Zap,
  Smartphone,
  Shirt,
  Plane,
  Gift,
  DollarSign,
};

export const availableIcons = Object.keys(iconMap);

export const availableColors = [
  "hsl(25, 90%, 55%)",
  "hsl(210, 80%, 55%)",
  "hsl(165, 60%, 45%)",
  "hsl(340, 75%, 55%)",
  "hsl(280, 65%, 55%)",
  "hsl(45, 85%, 50%)",
  "hsl(320, 70%, 50%)",
  "hsl(155, 60%, 40%)",
  "hsl(200, 70%, 50%)",
  "hsl(230, 70%, 55%)",
  "hsl(350, 65%, 50%)",
  "hsl(180, 60%, 45%)",
  "hsl(300, 60%, 50%)",
  "hsl(0, 0%, 50%)",
];
