import { Plane, Car, GraduationCap, Home } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Viagem Europa",
    icon: Plane,
    target: 25000,
    current: 18750,
    color: "hsl(210, 80%, 55%)",
    deadline: "Dez 2025",
  },
  {
    id: 2,
    name: "Carro Novo",
    icon: Car,
    target: 80000,
    current: 32000,
    color: "hsl(195, 55%, 28%)",
    deadline: "Jun 2026",
  },
  {
    id: 3,
    name: "Fundo Educação",
    icon: GraduationCap,
    target: 50000,
    current: 12500,
    color: "hsl(45, 85%, 50%)",
    deadline: "Contínuo",
  },
  {
    id: 4,
    name: "Entrada Imóvel",
    icon: Home,
    target: 150000,
    current: 45000,
    color: "hsl(165, 60%, 45%)",
    deadline: "2027",
  },
];

export const SavingsGoals = () => {
  return (
    <div className="financial-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Caixinhas</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          Ver todas
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percentage = Math.round((goal.current / goal.target) * 100);

          return (
            <div
              key={goal.id}
              className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2.5 rounded-xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${goal.color}15` }}
                >
                  <Icon size={20} style={{ color: goal.color }} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {goal.deadline}
                </span>
              </div>

              <h4 className="font-medium mb-1">{goal.name}</h4>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-lg font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                  }).format(goal.current)}
                </span>
                <span className="text-sm text-muted-foreground">
                  de{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                  }).format(goal.target)}
                </span>
              </div>

              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: goal.color,
                    }}
                  />
                </div>
                <span
                  className="absolute right-0 -top-5 text-xs font-medium"
                  style={{ color: goal.color }}
                >
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
