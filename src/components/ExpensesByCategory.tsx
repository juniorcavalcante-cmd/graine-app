import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Alimentação", value: 2450, color: "hsl(25, 90%, 55%)" },
  { name: "Transporte", value: 890, color: "hsl(210, 80%, 55%)" },
  { name: "Saúde", value: 650, color: "hsl(340, 75%, 55%)" },
  { name: "Moradia", value: 3200, color: "hsl(165, 60%, 45%)" },
  { name: "Lazer", value: 420, color: "hsl(280, 65%, 55%)" },
  { name: "Educação", value: 780, color: "hsl(45, 85%, 50%)" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export const ExpensesByCategory = () => {
  return (
    <div className="financial-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-6">Despesas por Categoria</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-48 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value)
                }
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                notation: "compact",
              }).format(total)}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-3 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium truncate">
                    {item.name}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {((item.value / total) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / total) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold w-20 text-right">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  notation: "compact",
                }).format(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
