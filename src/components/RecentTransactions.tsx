import {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Briefcase,
  Heart,
  Gamepad2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const transactions = [
  {
    id: 1,
    description: "Supermercado Extra",
    category: "Alimentação",
    person: "Ana",
    personInitials: "AN",
    amount: -342.5,
    date: "Hoje",
    icon: ShoppingCart,
    iconColor: "hsl(25, 90%, 55%)",
    type: "variável",
    status: "pago",
  },
  {
    id: 2,
    description: "Salário",
    category: "Receita",
    person: "Carlos",
    personInitials: "CA",
    amount: 8500,
    date: "Ontem",
    icon: Briefcase,
    iconColor: "hsl(155, 60%, 40%)",
    type: "fixa",
    status: "pago",
  },
  {
    id: 3,
    description: "Aluguel",
    category: "Moradia",
    person: "Ana",
    personInitials: "AN",
    amount: -2200,
    date: "25 Jan",
    icon: Home,
    iconColor: "hsl(165, 60%, 45%)",
    type: "fixa",
    status: "pago",
  },
  {
    id: 4,
    description: "Uber",
    category: "Transporte",
    person: "Carlos",
    personInitials: "CA",
    amount: -45.9,
    date: "24 Jan",
    icon: Car,
    iconColor: "hsl(210, 80%, 55%)",
    type: "variável",
    status: "pago",
  },
  {
    id: 5,
    description: "Restaurante",
    category: "Alimentação",
    person: "Ana",
    personInitials: "AN",
    amount: -128.0,
    date: "23 Jan",
    icon: Utensils,
    iconColor: "hsl(25, 90%, 55%)",
    type: "variável",
    status: "pago",
  },
];

export const RecentTransactions = () => {
  return (
    <div className="financial-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Lançamentos Recentes</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          Ver todos
        </button>
      </div>

      <div className="space-y-1">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;
          const isIncome = transaction.amount > 0;

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className="p-2.5 rounded-xl"
                style={{
                  backgroundColor: `${transaction.iconColor}15`,
                }}
              >
                <Icon
                  size={18}
                  style={{ color: transaction.iconColor }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">
                    {transaction.description}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      transaction.type === "fixa"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {transaction.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {transaction.date}
                  </span>
                </div>
              </div>

              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                  {transaction.personInitials}
                </AvatarFallback>
              </Avatar>

              <span
                className={`font-semibold text-right min-w-[100px] ${
                  isIncome ? "text-income" : "text-expense"
                }`}
              >
                {isIncome ? "+" : ""}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
