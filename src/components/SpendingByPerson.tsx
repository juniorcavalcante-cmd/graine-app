import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { defaultPeople, getLimitStatus, getLimitPercentage } from "@/data/people";

export const SpendingByPerson = () => {
  const total = defaultPeople.filter(p => p.isActive).reduce((sum, p) => sum + p.spent, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="financial-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-6">Gastos por Pessoa</h3>

      <div className="space-y-5">
        {defaultPeople.filter(p => p.isActive).map((person) => {
          const status = getLimitStatus(person.spent, person.monthlyLimit);
          const percentage = getLimitPercentage(person.spent, person.monthlyLimit);
          const remaining = person.monthlyLimit - person.spent;

          return (
            <div key={person.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: person.color }}>
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback
                    className="font-semibold text-sm"
                    style={{ 
                      backgroundColor: person.type === "casa" ? "hsl(45, 85%, 90%)" : person.color, 
                      color: person.type === "casa" ? "hsl(45, 85%, 30%)" : "white" 
                    }}
                  >
                    {person.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{person.name}</span>
                      {status === "exceeded" && (
                        <AlertCircle size={16} className="text-expense" />
                      )}
                      {status === "warning" && (
                        <AlertTriangle size={16} className="text-warning" />
                      )}
                    </div>
                    <span className="font-semibold">{formatCurrency(person.spent)}</span>
                  </div>
                </div>
              </div>

              <div className="ml-[52px]">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      status === "exceeded"
                        ? "bg-expense"
                        : status === "warning"
                        ? "bg-warning"
                        : ""
                    }`}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: status === "normal" ? person.color : undefined,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    Limite: {formatCurrency(person.monthlyLimit)}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      status === "exceeded"
                        ? "text-expense"
                        : status === "warning"
                        ? "text-warning"
                        : "text-income"
                    }`}
                  >
                    {remaining >= 0
                      ? `Restam ${formatCurrency(remaining)}`
                      : `Excedido ${formatCurrency(Math.abs(remaining))}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total do mês</span>
          <span className="text-lg font-bold">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};
