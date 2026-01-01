import { useState } from "react";
import {
  Plane,
  Car,
  GraduationCap,
  Home,
  Plus,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const caixinhas = [
  {
    id: 1,
    name: "Viagem Europa",
    icon: Plane,
    target: 25000,
    current: 18750,
    color: "hsl(210, 80%, 55%)",
    deadline: "Dezembro 2025",
    monthlyTarget: 1500,
    lastDeposit: "R$ 1.500 em 15/01",
    history: [
      { month: "Jan", amount: 1500 },
      { month: "Dez", amount: 1500 },
      { month: "Nov", amount: 1200 },
      { month: "Out", amount: 1500 },
      { month: "Set", amount: 1500 },
    ],
  },
  {
    id: 2,
    name: "Carro Novo",
    icon: Car,
    target: 80000,
    current: 32000,
    color: "hsl(195, 55%, 28%)",
    deadline: "Junho 2026",
    monthlyTarget: 3000,
    lastDeposit: "R$ 2.500 em 10/01",
    history: [
      { month: "Jan", amount: 2500 },
      { month: "Dez", amount: 3000 },
      { month: "Nov", amount: 3000 },
      { month: "Out", amount: 2500 },
      { month: "Set", amount: 3000 },
    ],
  },
  {
    id: 3,
    name: "Fundo Educação",
    icon: GraduationCap,
    target: 50000,
    current: 12500,
    color: "hsl(45, 85%, 50%)",
    deadline: "Contínuo",
    monthlyTarget: 1000,
    lastDeposit: "R$ 1.000 em 05/01",
    history: [
      { month: "Jan", amount: 1000 },
      { month: "Dez", amount: 1000 },
      { month: "Nov", amount: 1000 },
      { month: "Out", amount: 1000 },
      { month: "Set", amount: 1000 },
    ],
  },
  {
    id: 4,
    name: "Entrada Imóvel",
    icon: Home,
    target: 150000,
    current: 45000,
    color: "hsl(165, 60%, 45%)",
    deadline: "2027",
    monthlyTarget: 4000,
    lastDeposit: "R$ 4.000 em 20/01",
    history: [
      { month: "Jan", amount: 4000 },
      { month: "Dez", amount: 4000 },
      { month: "Nov", amount: 3500 },
      { month: "Out", amount: 4000 },
      { month: "Set", amount: 4000 },
    ],
  },
];

export const Caixinhas = () => {
  const [selectedCaixinha, setSelectedCaixinha] = useState(caixinhas[0]);

  const totalReserved = caixinhas.reduce((sum, c) => sum + c.current, 0);
  const totalTarget = caixinhas.reduce((sum, c) => sum + c.target, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Caixinhas</h1>
          <p className="text-muted-foreground mt-1">
            Seus objetivos financeiros e metas de poupança
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Nova caixinha
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="financial-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-income/10">
              <TrendingUp size={20} className="text-income" />
            </div>
            <span className="text-sm text-muted-foreground">Total Reservado</span>
          </div>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalReserved)}
          </p>
        </div>

        <div className="financial-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target size={20} className="text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Meta Total</span>
          </div>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalTarget)}
          </p>
        </div>

        <div className="financial-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Calendar size={20} className="text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Progresso Geral</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.round((totalReserved / totalTarget) * 100)}%
          </p>
        </div>
      </div>

      {/* Caixinhas Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {caixinhas.map((caixinha) => {
              const Icon = caixinha.icon;
              const percentage = Math.round(
                (caixinha.current / caixinha.target) * 100
              );
              const isSelected = selectedCaixinha.id === caixinha.id;

              return (
                <button
                  key={caixinha.id}
                  onClick={() => setSelectedCaixinha(caixinha)}
                  className={`financial-card text-left transition-all ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${caixinha.color}15` }}
                    >
                      <Icon size={24} style={{ color: caixinha.color }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {caixinha.deadline}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{caixinha.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        notation: "compact",
                      }).format(caixinha.current)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      de{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        notation: "compact",
                      }).format(caixinha.target)}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: caixinha.color,
                        }}
                      />
                    </div>
                    <span
                      className="absolute right-0 -top-6 text-sm font-semibold"
                      style={{ color: caixinha.color }}
                    >
                      {percentage}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          <div className="financial-card">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${selectedCaixinha.color}15` }}
              >
                <selectedCaixinha.icon
                  size={24}
                  style={{ color: selectedCaixinha.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold">{selectedCaixinha.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Meta: {selectedCaixinha.deadline}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Aporte mensal sugerido
                </span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(selectedCaixinha.monthlyTarget)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Último depósito
                </span>
                <span className="font-medium text-sm">
                  {selectedCaixinha.lastDeposit}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Falta para a meta
                </span>
                <span className="font-semibold text-primary">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(selectedCaixinha.target - selectedCaixinha.current)}
                </span>
              </div>
            </div>

            <Button className="w-full mt-4">Fazer aporte</Button>
          </div>

          <div className="financial-card">
            <h4 className="font-semibold mb-4">Histórico de Aportes</h4>
            <div className="space-y-2">
              {selectedCaixinha.history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.month}
                  </span>
                  <span className="font-medium text-income">
                    +
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
