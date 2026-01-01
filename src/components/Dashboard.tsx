import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { ExpensesByCategory } from "./ExpensesByCategory";
import { SpendingByPerson } from "./SpendingByPerson";
import { RecentTransactions } from "./RecentTransactions";
import { FinancialCalendarWidget } from "./FinancialCalendarWidget";
import { AlertsWidget } from "./AlertsWidget";
import { SavingsGoals } from "./SavingsGoals";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Olá, Ana e Carlos 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Aqui está o resumo financeiro de janeiro 2025
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Período:</span>
          <select className="text-sm font-medium bg-muted px-3 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-primary/20">
            <option>Janeiro 2025</option>
            <option>Dezembro 2024</option>
            <option>Novembro 2024</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Saldo Total"
          value="R$ 24.580,00"
          icon={<Wallet size={24} />}
          trend={{ value: 12.5, label: "vs mês anterior" }}
        />
        <StatCard
          title="Total de Entradas"
          value="R$ 15.200,00"
          icon={<TrendingUp size={24} />}
          variant="income"
          trend={{ value: 8.2, label: "vs mês anterior" }}
        />
        <StatCard
          title="Total de Despesas"
          value="R$ 8.190,00"
          icon={<TrendingDown size={24} />}
          variant="expense"
          trend={{ value: -5.4, label: "vs mês anterior" }}
        />
        <StatCard
          title="Reservado em Caixinhas"
          value="R$ 108.250,00"
          icon={<PiggyBank size={24} />}
          trend={{ value: 3.2, label: "este mês" }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <ExpensesByCategory />
          <RecentTransactions />
          <SavingsGoals />
        </div>

        {/* Right Column - 1 col */}
        <div className="space-y-6">
          <SpendingByPerson />
          <FinancialCalendarWidget />
          <AlertsWidget />
        </div>
      </div>
    </div>
  );
};
