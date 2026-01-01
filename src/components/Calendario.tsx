import { useState } from "react";
import { ChevronLeft, ChevronRight, Zap, Home, CreditCard } from "lucide-react";

const monthDays = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const events: Array<{
    type: "expense" | "income" | "due";
    title: string;
    amount: number;
    icon: any;
  }> = [];

  if (day === 5) {
    events.push({
      type: "income",
      title: "Salário Carlos",
      amount: 8500,
      icon: CreditCard,
    });
  }
  if (day === 10) {
    events.push({
      type: "due",
      title: "Conta de Luz",
      amount: -245,
      icon: Zap,
    });
  }
  if (day === 15) {
    events.push({
      type: "due",
      title: "Internet",
      amount: -150,
      icon: Zap,
    });
  }
  if (day === 25) {
    events.push({
      type: "income",
      title: "Salário Ana",
      amount: 6700,
      icon: CreditCard,
    });
    events.push({
      type: "expense",
      title: "Aluguel",
      amount: -2200,
      icon: Home,
    });
  }

  return { day, events };
});

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const Calendario = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const today = new Date().getDate();

  const selectedDayData = selectedDay
    ? monthDays.find((d) => d.day === selectedDay)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendário</h1>
          <p className="text-muted-foreground mt-1">
            Visualize suas finanças ao longo do mês
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2 financial-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Janeiro 2025</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft size={20} className="text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-3"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for offset (January 2025 starts on Wednesday) */}
            {[...Array(3)].map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {monthDays.map((item) => {
              const isToday = item.day === today;
              const isSelected = item.day === selectedDay;
              const hasEvents = item.events.length > 0;

              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`aspect-square rounded-xl p-2 flex flex-col items-center justify-start transition-all text-sm ${
                    isSelected
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                      : isToday
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className={`${hasEvents ? "font-semibold" : ""}`}>
                    {item.day}
                  </span>
                  {hasEvents && (
                    <div className="flex gap-1 mt-1">
                      {item.events.some((e) => e.type === "expense") && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-primary-foreground" : "bg-expense"
                          }`}
                        />
                      )}
                      {item.events.some((e) => e.type === "income") && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-primary-foreground" : "bg-income"
                          }`}
                        />
                      )}
                      {item.events.some((e) => e.type === "due") && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-primary-foreground" : "bg-warning"
                          }`}
                        />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-expense" />
              <span className="text-sm text-muted-foreground">Despesa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-income" />
              <span className="text-sm text-muted-foreground">Receita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Vencimento</span>
            </div>
          </div>
        </div>

        {/* Day Details */}
        <div className="financial-card">
          {selectedDayData ? (
            <>
              <h3 className="text-lg font-semibold mb-4">
                {selectedDayData.day} de Janeiro
              </h3>

              {selectedDayData.events.length > 0 ? (
                <div className="space-y-3">
                  {selectedDayData.events.map((event, index) => {
                    const Icon = event.icon;
                    const isIncome = event.type === "income";
                    const isDue = event.type === "due";

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl ${
                          isIncome
                            ? "bg-income-light"
                            : isDue
                            ? "bg-warning-light"
                            : "bg-expense-light"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isIncome
                                ? "bg-income/20"
                                : isDue
                                ? "bg-warning/20"
                                : "bg-expense/20"
                            }`}
                          >
                            <Icon
                              size={18}
                              className={
                                isIncome
                                  ? "text-income"
                                  : isDue
                                  ? "text-warning"
                                  : "text-expense"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {event.title}
                            </h4>
                            <span
                              className={`text-sm font-semibold ${
                                isIncome
                                  ? "text-income"
                                  : isDue
                                  ? "text-warning"
                                  : "text-expense"
                              }`}
                            >
                              {isIncome ? "+" : ""}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(event.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Nenhum lançamento neste dia
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ChevronRight size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Selecione um dia
              </h3>
              <p className="text-muted-foreground text-sm">
                Clique em um dia do calendário para ver os detalhes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
