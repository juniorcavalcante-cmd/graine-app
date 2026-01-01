import { useState } from "react";
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
  Plus,
  Search,
  Filter,
  Check,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const transactionGroups = [
  {
    date: "Hoje, 28 de Janeiro",
    transactions: [
      {
        id: 1,
        description: "Supermercado Extra",
        category: "Alimentação",
        person: "Ana",
        personInitials: "AN",
        amount: -342.5,
        icon: ShoppingCart,
        iconColor: "hsl(25, 90%, 55%)",
        type: "variável",
        status: "pago",
      },
      {
        id: 2,
        description: "Uber - Trabalho",
        category: "Transporte",
        person: "Carlos",
        personInitials: "CA",
        amount: -28.9,
        icon: Car,
        iconColor: "hsl(210, 80%, 55%)",
        type: "variável",
        status: "pago",
      },
    ],
  },
  {
    date: "Ontem, 27 de Janeiro",
    transactions: [
      {
        id: 3,
        description: "Salário - Empresa X",
        category: "Receita",
        person: "Carlos",
        personInitials: "CA",
        amount: 8500,
        icon: Briefcase,
        iconColor: "hsl(155, 60%, 40%)",
        type: "fixa",
        status: "pago",
      },
      {
        id: 4,
        description: "Farmácia",
        category: "Saúde",
        person: "Ana",
        personInitials: "AN",
        amount: -87.6,
        icon: Heart,
        iconColor: "hsl(340, 75%, 55%)",
        type: "variável",
        status: "pago",
      },
    ],
  },
  {
    date: "25 de Janeiro",
    transactions: [
      {
        id: 5,
        description: "Aluguel",
        category: "Moradia",
        person: "Ana",
        personInitials: "AN",
        amount: -2200,
        icon: Home,
        iconColor: "hsl(165, 60%, 45%)",
        type: "fixa",
        status: "pago",
      },
      {
        id: 6,
        description: "Conta de Luz",
        category: "Moradia",
        person: "Carlos",
        personInitials: "CA",
        amount: -245.8,
        icon: Zap,
        iconColor: "hsl(45, 85%, 50%)",
        type: "fixa",
        status: "pago",
      },
      {
        id: 7,
        description: "Salário - Empresa Y",
        category: "Receita",
        person: "Ana",
        personInitials: "AN",
        amount: 6700,
        icon: Briefcase,
        iconColor: "hsl(155, 60%, 40%)",
        type: "fixa",
        status: "pago",
      },
    ],
  },
  {
    date: "20 de Janeiro",
    transactions: [
      {
        id: 8,
        description: "Restaurante Japonês",
        category: "Alimentação",
        person: "Ana",
        personInitials: "AN",
        amount: -156.0,
        icon: Utensils,
        iconColor: "hsl(25, 90%, 55%)",
        type: "variável",
        status: "pago",
      },
      {
        id: 9,
        description: "Curso Online",
        category: "Educação",
        person: "Carlos",
        personInitials: "CA",
        amount: -197.0,
        icon: GraduationCap,
        iconColor: "hsl(45, 85%, 50%)",
        type: "variável",
        status: "pago",
      },
      {
        id: 10,
        description: "Netflix + Spotify",
        category: "Lazer",
        person: "Ana",
        personInitials: "AN",
        amount: -69.8,
        icon: Gamepad2,
        iconColor: "hsl(280, 65%, 55%)",
        type: "fixa",
        status: "a pagar",
      },
    ],
  },
];

export const Lancamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lançamentos</h1>
          <p className="text-muted-foreground mt-1">
            Histórico completo de entradas e saídas
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Novo lançamento
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar lançamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filtros
          </Button>
          <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
            <option>Todas as categorias</option>
            <option>Alimentação</option>
            <option>Transporte</option>
            <option>Moradia</option>
            <option>Saúde</option>
            <option>Lazer</option>
            <option disabled className="text-muted-foreground">──────────</option>
            <option value="new">+ Nova categoria</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
            <option>Todas as pessoas</option>
            <option>Ana</option>
            <option>Carlos</option>
            <option>Casa</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-6">
        {transactionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {group.date}
              </h3>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="financial-card p-0 overflow-hidden">
              {group.transactions.map((transaction, index) => {
                const Icon = transaction.icon;
                const isIncome = transaction.amount > 0;
                const isLast = index === group.transactions.length - 1;

                return (
                  <div
                    key={transaction.id}
                    className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                      !isLast ? "border-b border-border" : ""
                    }`}
                  >
                    <div
                      className="p-2.5 rounded-xl flex-shrink-0"
                      style={{
                        backgroundColor: `${transaction.iconColor}15`,
                      }}
                    >
                      <Icon size={20} style={{ color: transaction.iconColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">
                          {transaction.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {transaction.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          transaction.type === "fixa"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {transaction.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          transaction.status === "pago"
                            ? "bg-income-light text-income"
                            : "bg-warning-light text-warning"
                        }`}
                      >
                        {transaction.status === "pago" ? (
                          <Check size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {transaction.status}
                      </span>
                    </div>

                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs bg-muted">
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
        ))}
      </div>
    </div>
  );
};
