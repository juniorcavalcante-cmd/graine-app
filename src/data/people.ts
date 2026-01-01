export interface Person {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  type: "pessoa" | "casa";
  monthlyLimit: number;
  spent: number;
  isActive: boolean;
  color: string;
}

export const defaultPeople: Person[] = [
  {
    id: "1",
    name: "Ana",
    initials: "AN",
    avatar: "",
    type: "pessoa",
    monthlyLimit: 5000,
    spent: 4250,
    isActive: true,
    color: "hsl(195, 55%, 28%)",
  },
  {
    id: "2",
    name: "Carlos",
    initials: "CA",
    avatar: "",
    type: "pessoa",
    monthlyLimit: 5000,
    spent: 3940,
    isActive: true,
    color: "hsl(155, 60%, 40%)",
  },
  {
    id: "casa",
    name: "Casa",
    initials: "🏠",
    avatar: "",
    type: "casa",
    monthlyLimit: 8000,
    spent: 5200,
    isActive: true,
    color: "hsl(45, 85%, 50%)",
  },
];

export const getLimitStatus = (spent: number, limit: number) => {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return "exceeded";
  if (percentage >= 80) return "warning";
  return "normal";
};

export const getLimitPercentage = (spent: number, limit: number) => {
  return Math.min((spent / limit) * 100, 100);
};
