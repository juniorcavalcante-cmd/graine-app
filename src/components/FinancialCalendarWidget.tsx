import { ChevronLeft, ChevronRight } from "lucide-react";

const calendarDays = [
  { day: 1, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 2, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 3, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 4, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 5, hasExpense: false, hasIncome: true, hasDue: false },
  { day: 6, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 7, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 8, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 9, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 10, hasExpense: false, hasIncome: false, hasDue: true },
  { day: 11, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 12, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 13, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 14, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 15, hasExpense: false, hasIncome: false, hasDue: true },
  { day: 16, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 17, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 18, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 19, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 20, hasExpense: false, hasIncome: false, hasDue: true },
  { day: 21, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 22, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 23, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 24, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 25, hasExpense: true, hasIncome: true, hasDue: false },
  { day: 26, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 27, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 28, hasExpense: true, hasIncome: false, hasDue: false },
  { day: 29, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 30, hasExpense: false, hasIncome: false, hasDue: false },
  { day: 31, hasExpense: false, hasIncome: false, hasDue: true },
];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export const FinancialCalendarWidget = () => {
  const today = new Date().getDate();

  return (
    <div className="financial-card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Janeiro 2025</h3>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset (January 2025 starts on Wednesday) */}
        {[...Array(3)].map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {calendarDays.map((item) => {
          const isToday = item.day === today;

          return (
            <button
              key={item.day}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all hover:bg-muted ${
                isToday
                  ? "bg-primary text-primary-foreground font-semibold"
                  : ""
              }`}
            >
              {item.day}
              {(item.hasExpense || item.hasIncome || item.hasDue) && (
                <div className="flex gap-0.5 mt-0.5">
                  {item.hasExpense && (
                    <div className="w-1 h-1 rounded-full bg-expense" />
                  )}
                  {item.hasIncome && (
                    <div className="w-1 h-1 rounded-full bg-income" />
                  )}
                  {item.hasDue && (
                    <div className="w-1 h-1 rounded-full bg-warning" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-expense" />
          <span className="text-xs text-muted-foreground">Despesa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-income" />
          <span className="text-xs text-muted-foreground">Receita</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Vencimento</span>
        </div>
      </div>
    </div>
  );
};
